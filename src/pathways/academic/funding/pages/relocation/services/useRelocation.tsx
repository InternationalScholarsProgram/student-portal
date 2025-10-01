import { useQuery, useQueryClient } from "@tanstack/react-query";
import relocationApis from "./relocationApis";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import { useMemo } from "react";
import { Status } from "../types/relocationTypes";
import { splitDate } from "../../../../../../utils/utils";
import { RepaymentSchedule } from "../../../types/fundingTypes";

const _queryKeys = (email: any) => ({
  status: [email, "relocation-loans"] as const,
});

const toNum = (v: any) => (v == null ? 0 : Number(v));

const useRelocation = () => {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  const {
    data: relocationStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.status,
    queryFn: relocationApis.status,
    enabled: !!user?.email,
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

      // Normalize schedule rows only (keep them “Pending”)
      const normalized: RepaymentSchedule[] = schedule
        .filter((row: any) => toNum(row?.scheduled_payment) > 0) // drop header-like row
        .map((row: any, idx: number) => ({
          id: idx + 1,
          maturity_date: String(row?.maturity_date ?? ""),
          scheduled_payment: toNum(row?.scheduled_payment),
          interest_rate: toNum(row?.interest_rate),
          new_balance: toNum(row?.new_balance),
          status: (row?.status as string) || "Pending",
        }))
        .sort((a, b) => (a.maturity_date < b.maturity_date ? -1 : 1));

      return { schedule: normalized, pastPayments: past };
    },
    enabled: !!loan?.loan_id,
  });

  return {
    user,
    relocationStatus,
    loan,
    extraLoan,
    application,
    isLoading: isLoading || isLoadingSchedule,
    error: error || errorSchedule,
    invalidate,
    schedulePayments: scheduleWrap?.schedule ?? [],
    pastPayments: scheduleWrap?.pastPayments ?? [],
  };
};

export default useRelocation;
