import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import alternativeEndpoints from "./alternativeEndpoints";
import fundingEndpoints from "../../../services/fundingEndpoints";
import { splitDate } from "../../../../../../utils/utils";
import { RepaymentSchedule } from "../../../types/fundingTypes";

type AltStatus = {
  status: number | string;
  user_details?: any;
  personal_loan?: any;
  supplementary_loan?: any;
};

type Options = { enabled?: boolean };

const _queryKeys = (email: any) => ({
  status: [email, "alternative-loans"] as const,
});

const useAlternative = (options: Options = {}) => {
  const { enabled = true } = options;
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  const {
    data: alternativeStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.status,
    queryFn: alternativeEndpoints.status,
    enabled: !!user?.email && enabled,
    select: (res) => res?.data?.data as AltStatus,
  });

  const user_details = alternativeStatus?.user_details;
  const personal_loan = alternativeStatus?.personal_loan;
  const supplementary_loan = alternativeStatus?.supplementary_loan;

  const loan = {
    ...personal_loan,
    maturity_date: splitDate(personal_loan?.maturity_date || ""),
  };

  const invalidate = (key: "status") =>
    queryClient.invalidateQueries({ queryKey: queryKeys[key] || key });

  const { data: schedulePayments } = useQuery({
    queryKey: [user?.email, "repayment-schedule", loan?.loan_id],
    queryFn: () => fundingEndpoints.repaymentSchedule(loan),
    select: (response) => response?.data?.data?.slice(1) as RepaymentSchedule[],
    enabled:
      enabled && Number(alternativeStatus?.status) === 2 && !!loan?.loan_id,
  });

  return {
    user,
    alternativeStatus,
    status: alternativeStatus?.status,
    user_details,
    loan,
    supplementary_loan,

    isLoading,
    error,
    invalidate,
    schedulePayments,
  };
};

export default useAlternative;
