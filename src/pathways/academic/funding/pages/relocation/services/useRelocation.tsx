import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import relocationApis from "./relocationApis";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import { useMemo } from "react";
import { Status } from "../types/relocationTypes";
import { splitDate } from "../../../../../../utils/utils";
import { RepaymentSchedule } from "../../../types/fundingTypes";

type Options = { enabled?: boolean };

const _queryKeys = (email: any) => ({
  status: [email, "relocation-loans"] as const,
});

const toNum = (v: any) => (v == null ? 0 : Number(v));

/**
 * useRelocation
 * - Fetches relocation status and normalized repayment schedule
 * - Exposes invalidate("status")
 * - Exposes two mutations:
 *    - signContractAccept(...)  -> accept & upload signed PDF
 *    - signContractReject(...)  -> reject with reason
 *
 * Both mutations will invalidate the status query on success.
 */
const useRelocation = (options: Options = {}) => {
  const { enabled = true } = options;
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  // ----- Status -----
  const {
    data: relocationStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.status,
    queryFn: relocationApis.status,
    enabled: !!user?.email && enabled,
    select: (response) => response?.data?.data as Status,
  });

  const loan = {
    ...relocationStatus?.loan,
    maturity_date: splitDate(relocationStatus?.loan?.maturity_date || ""),
  };
  const application = relocationStatus?.application;
  const extraLoan = relocationStatus?.extra_loan;

  const invalidate = (key: "status") =>
    queryClient.invalidateQueries({ queryKey: queryKeys[key] || key });

  // ----- Repayment Schedule -----
  const {
    data: scheduleWrap,
    isLoading: isLoadingSchedule,
    error: errorSchedule,
  } = useQuery({
    queryKey: [user?.email, "repayment-schedule", loan?.loan_id],
    queryFn: () => relocationApis.repaymentSchedule(loan),
    select: (response) => {
      const payload = response?.data?.data ?? {};
      const schedule = Array.isArray(payload?.schedule) ? payload.schedule : [];
      const past = Array.isArray(payload?.past_payments) ? payload.past_payments : [];

      const normalized: RepaymentSchedule[] = schedule
        .filter((row: any) => toNum(row?.scheduled_payment) > 0)
        .map((row: any, idx: number) => ({
          id: idx + 1,
          maturity_date: String(row?.maturity_date ?? ""),
          scheduled_payment: toNum(row?.scheduled_payment),
          interest_rate: toNum(row?.interest_rate),
          new_balance: toNum(row?.new_balance),
          status: (row?.status as string) || "Pending",
        }))
        .sort((a: { maturity_date: number; }, b: { maturity_date: number; }) => (a.maturity_date < b.maturity_date ? -1 : 1));

      return { schedule: normalized, pastPayments: past };
    },
    enabled: enabled && !!loan?.loan_id,
  });

  // =========================
  // Signing / Rejecting flows
  // =========================

  /**
   * Accept & upload signed contract (PDF).
   * NOTE: This uses relocationApis.signContractAccept if available.
   * If your API only has relocationApis.signContract, it will fall back to that.
   */
  const signContractAccept = useMutation({
    mutationFn: async (args: {
      file: File | Blob;
      ip?: string;
      city?: string;
      country_name?: string;
      stu_name?: string; // optional override; falls back to loan.fullnames
    }) => {
      const { file, ip, city, country_name, stu_name } = args;
      const student_id = user?.email || "";
      const loan_id = loan?.loan_id;

      if (!student_id || !loan_id) {
        throw new Error("Missing student_id or loan_id for contract acceptance.");
      }

      // Prefer explicit API if present
      const maybeAccept = (relocationApis as any).signContractAccept;
      if (typeof maybeAccept === "function") {
        return maybeAccept({
          student_id,
          ip,
          city,
          country_name,
          loan_id,
          stu_name: stu_name || loan?.fullnames || "",
          file,
        });
      }

      // Fallback to legacy single-endpoint signature
      // Ensure field key matches backend ("file", "ip", "city", "country_name", "loan_id", "stu_name")
      const payload: any = {
        ip,
        city,
        country_name,
        loan_id,
        stu_name: stu_name || loan?.fullnames || "",
        file,
        // If your legacy endpoint needs an action field:
        action: "accept",
        student_id,
      };
      return (relocationApis as any).signContract(payload);
    },
    onSuccess: () => invalidate("status"),
  });

  /**
   * Reject contract with a reason.
   * NOTE: This uses relocationApis.signContractReject if available.
   * If your API only has relocationApis.signContract, it will fall back to that with action="reject".
   */
  const signContractReject = useMutation({
    mutationFn: async (args: {
      reason: string;
      ip?: string;
      city?: string;
      country_name?: string;
    }) => {
      const { reason, ip, city, country_name } = args;
      const student_id = user?.email || "";
      const loan_id = loan?.loan_id;

      if (!student_id || !loan_id) {
        throw new Error("Missing student_id or loan_id for contract rejection.");
      }
      if (!reason?.trim()) {
        throw new Error("Please provide a rejection reason.");
      }

      // Prefer explicit API if present
      const maybeReject = (relocationApis as any).signContractReject;
      if (typeof maybeReject === "function") {
        return maybeReject({
          student_id,
          reason,
          ip,
          city,
          country_name,
          loan_id,
        });
      }

      // Fallback to legacy endpoint with action="reject"
      const payload: any = {
        ip,
        city,
        country_name,
        loan_id,
        reason,
        action: "reject",
        student_id,
      };
      return (relocationApis as any).signContract(payload);
    },
    onSuccess: () => invalidate("status"),
  });

  return {
    user,
    relocationStatus,
    loan,
    extraLoan,
    application,

    isLoading: isLoading || isLoadingSchedule,
    error: error || errorSchedule,

    // queries utils
    invalidate,
    schedulePayments: scheduleWrap?.schedule ?? [],
    pastPayments: scheduleWrap?.pastPayments ?? [],

    // mutations for signing & rejecting
    signContractAccept, // use signContractAccept.mutate({...})
    signContractReject, // use signContractReject.mutate({...})
  };
};

export default useRelocation;
