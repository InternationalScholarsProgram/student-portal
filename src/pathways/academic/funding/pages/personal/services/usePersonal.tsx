// services/usePersonal.ts
import { useMemo } from "react";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import personalEndpoints from "./personalEndpoints";
import { RepaymentSchedule } from "../../../types/fundingTypes";

type Options = { enabled?: boolean };

const _queryKeys = (email?: string) => ({
  status: [email, "personal-loans"] as const,
});

const toNum = (v: any) => (v == null ? 0 : Number(v));
const isTruthy = (v: any) => v != null && String(v).trim() !== "";

const usePersonal = (options: Options = {}) => {
  const { enabled = true } = options;
  const { user } = useFetchUser();
  const email = user?.email ?? "";
  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(email), [email]);

  const { data: rawData, isLoading, error } = useQuery({
    queryKey: queryKeys.status,
    queryFn: () => personalEndpoints.status(email),
    enabled: !!email && enabled,
    select: (res) => res?.data?.data,
  });

  const user_details = rawData?.personal_loan_user ?? null;
  const personalLoan = rawData?.personal_loan ?? null;

  // ---- existing derived status (kept exactly as-is) ----
  const pStatus: number | null = useMemo(() => {
    const raw = (personalLoan as any)?.status;
    if (raw === null || raw === undefined || raw === "null" || raw === "") return null;
    const n = Number(raw);
    return Number.isNaN(n) ? null : n;
  }, [personalLoan]);

  const viewStatus: 0 | 1 | 2 = useMemo(() => {
    if (!personalLoan) return 0;
    if (pStatus === 1) return 1;
    return 2;
  }, [personalLoan, pStatus]);

  // ---- supplementary (raw objects) ----
  const supplementaryUser = rawData?.supplementary_user ?? null;     // SOURCE OF TRUTH for "application received"
  const supplementaryLoan = rawData?.supplementary_loan ?? null;     // may be null

  // existing view based on supplementary_loan (kept for backward-compat)
  const sStatus: number | null = useMemo(() => {
    const raw = (supplementaryLoan as any)?.status;
    if (raw === null || raw === undefined || raw === "null" || raw === "") return null;
    const n = Number(raw);
    return Number.isNaN(n) ? null : n;
  }, [supplementaryLoan]);

  const supplementaryViewStatus: 0 | 1 | 2 = useMemo(() => {
    if (!supplementaryLoan) return 0;
    if (sStatus === 1) return 1;
    return 2;
  }, [supplementaryLoan, sStatus]);

  // ---- submit application (unchanged) ----
  const {
    mutate: submitApplication,
    isPending: isSubmittingApplication,
    error: submitApplicationError,
  } = useMutation({
    mutationFn: (payload: FormData) => personalEndpoints.application(payload, email),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.status }),
  });

  // ---- repayment schedule (unchanged) ----
  const {
    data: scheduleWrap,
    isLoading: isLoadingSchedule,
    error: errorSchedule,
  } = useQuery({
    queryKey: [email, "repayment-schedule", personalLoan?.loan_id],
    queryFn: () => personalEndpoints.repaymentSchedule(personalLoan),
    select: (response) => {
      const payload = response?.data?.data ?? {};

      const scheduleRaw = Array.isArray(payload?.schedule) ? payload.schedule : [];
      const normalized: RepaymentSchedule[] = scheduleRaw
        .filter((row: any) => toNum(row?.scheduled_payment) > 0)
        .map((row: any, idx: number) => ({
          id: idx + 1,
          maturity_date: String(row?.maturity_date ?? ""),
          scheduled_payment: toNum(row?.scheduled_payment),
          interest_rate: toNum(row?.interest_rate),
          new_balance: toNum(row?.new_balance),
          status: (row?.status as string) || "Pending",
        }))
        .sort((a: { maturity_date: number }, b: { maturity_date: number }) =>
          a.maturity_date < b.maturity_date ? -1 : 1
        );

      const normalizeBlock = (v: any): any[] => {
        if (!v) return [];
        if (Array.isArray(v)) return v;
        if (typeof v === "object") {
          if (Array.isArray((v as any).data)) return (v as any).data;
          if (Array.isArray((v as any).items)) return (v as any).items;
          const values = Object.values(v);
          const looksLikeEntry = (x: any) =>
            x && typeof x === "object" && (("id" in x) || ("loan_id" in x) || ("amount" in x) || ("date_paid" in x));
          const entries = values.filter(looksLikeEntry);
          if (entries.length) return entries;
          return [v];
        }
        return [];
      };

      const candidates = [
        payload?.past_payments,
        payload?.pastPayments,
        payload?.past,
        payload?.payments,
      ];

      let past: any[] = [];
      for (const c of candidates) past = past.concat(normalizeBlock(c));

      const seen = new Set<string>();
      past = past
        .filter((item) => !!item && typeof item === "object")
        .filter((item) => {
          const key = `${item?.id ?? ""}-${item?.invoice_id ?? ""}-${item?.payment_id ?? ""}-${item?.date_paid ?? item?.created_at ?? ""}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .sort((a: any, b: any) => {
          const ad = new Date(a?.date_paid ?? a?.created_at ?? "1970-01-01").getTime();
          const bd = new Date(b?.date_paid ?? b?.created_at ?? "1970-01-01").getTime();
          return ad - bd;
        });

      return { schedule: normalized, pastPayments: past };
    },
    enabled: enabled && !!personalLoan?.loan_id && viewStatus === 2,
  });

  const invalidate = (key: "status") =>
    queryClient.invalidateQueries({ queryKey: queryKeys[key] });

  // ---- contract actions (unchanged) ----
  const signContractAccept = useMutation({
    mutationFn: async (args: {
      file: File | Blob;
      ip?: string;
      city?: string;
      country_name?: string;
      stu_name?: string;
    }) => {
      const { file, ip, city, country_name, stu_name } = args;
      const student_id = email;
      const loan_id = personalLoan?.loan_id;
      if (!student_id || !loan_id) throw new Error("Missing student_id or loan_id.");
      return personalEndpoints.signContract({
        action: "accept",
        student_id,
        ip,
        city,
        country_name,
        loan_id,
        stu_name: stu_name || personalLoan?.fullnames || "",
        file,
      });
    },
    onSuccess: () => invalidate("status"),
  });

  const signContractReject = useMutation({
    mutationFn: async (args: {
      reason: string;
      ip?: string;
      city?: string;
      country_name?: string;
    }) => {
      const { reason, ip, city, country_name } = args;
      const student_id = email;
      const loan_id = personalLoan?.loan_id;
      if (!student_id || !loan_id) throw new Error("Missing student_id or loan_id.");
      if (!reason?.trim()) throw new Error("Please provide a rejection reason.");
      return personalEndpoints.signContract({
        action: "reject",
        student_id,
        reason,
        ip,
        city,
        country_name,
        loan_id,
      });
    },
    onSuccess: () => invalidate("status"),
  });

  // ---- existing view objects (kept) ----
  const status = useMemo(
    () => ({ ...(rawData ?? {}), status: viewStatus }),
    [rawData, viewStatus]
  );

  const supplementaryStatus = useMemo(
    () => ({ ...(rawData ?? {}), status: supplementaryViewStatus }),
    [rawData, supplementaryViewStatus]
  );

  // =========================
  // NEW: explicit supplementary statuses
  // =========================
  const supplementaryUserStatus: number | undefined = useMemo(() => {
    const raw = (supplementaryUser as any)?.status;
    if (raw === null || raw === undefined || raw === "null" || raw === "") return undefined;
    const n = Number(raw);
    return Number.isNaN(n) ? undefined : n;
  }, [supplementaryUser]);

  const supplementaryLoanStatus: number | undefined = useMemo(() => {
    const raw = (supplementaryLoan as any)?.status;
    if (raw === null || raw === undefined || raw === "null" || raw === "") return undefined;
    const n = Number(raw);
    return Number.isNaN(n) ? undefined : n;
  }, [supplementaryLoan]);

  // =========================
  // bank/servicing gating (kept)
  // =========================
  const bankComplete = useMemo(() => {
    if (!user_details) return false;
    return (
      Number(user_details?.ach_status) === 3 ||
      isTruthy(user_details?.mandate_id) ||
      isTruthy(user_details?.payment_method_id) ||
      isTruthy(user_details?.bank_account_id)
    );
  }, [user_details]);

  const isServicing = useMemo(() => {
    return (
      Number(user_details?.is_servicing) === 1 ||
      Number(user_details?.invoice_status) === 1
    );
  }, [user_details]);

  const personalStage: 0 | 1 | 2 | 4 = useMemo(() => {
    if (!personalLoan) return 0;
    if (pStatus === 1) return 1;
    if (bankComplete && isServicing) return 4;
    return 2;
  }, [personalLoan, pStatus, bankComplete, isServicing]);

  return {
    status,
    supplementaryStatus, // (legacy view based on supplementary_loan)

    isLoading: isLoading || isLoadingSchedule,
    error: error || errorSchedule,

    submitApplication,
    isSubmittingApplication,
    submitApplicationError,
    invalidate,

    signContractAccept,
    signContractReject,

    user_details,
    personalLoan,
    supplementaryUser,
    supplementaryLoan,

    // NEW explicit fields you should use:
    supplementaryUserStatus,  // ← from supplementary_user.status (your source of truth)
    supplementaryLoanStatus,  // ← from supplementary_loan.status (may be undefined)

    user,
    loanType: 2,

    schedulePayments: scheduleWrap?.schedule ?? [],
    pastPayments: scheduleWrap?.pastPayments ?? [],

    bankComplete,
    isServicing,
    personalStage,
  };
};

export default usePersonal;
