import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import alternativeEndpoints from "./alternativeEndpoints";
import fundingEndpoints from "../../../services/fundingEndpoints";
import { splitDate } from "../../../../../../utils/utils";
import { RepaymentSchedule } from "../../../types/fundingTypes";

type AltApiData = {
  study_loan_user?: any | null;
  study_loan?: any | null;
  additional_user?: any | null;
  additional_loan?: any | null;
  status?: number | string | null; 
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
    queryFn: () => alternativeEndpoints.status(user?.email || ""),
    enabled: !!user?.email && enabled,
    select: (res) => (res?.data?.data || {}) as AltApiData,
  });

  
  const user_details = alternativeStatus?.study_loan_user ?? null;
  const personal_loan = alternativeStatus?.study_loan ?? null;
  const supplementary_loan = alternativeStatus?.additional_loan ?? null;

  
  const isAllNulls =
    !alternativeStatus?.study_loan_user &&
    !alternativeStatus?.study_loan &&
    !alternativeStatus?.additional_user &&
    !alternativeStatus?.additional_loan;

  
  const status =
    alternativeStatus?.status ??
    alternativeStatus?.study_loan_user?.status ??
    (isAllNulls ? 0 : undefined);

  const loan = personal_loan
    ? {
        ...personal_loan,
        maturity_date: splitDate(personal_loan?.maturity_date || ""),
      }
    : undefined;

  const invalidate = (key: "status") =>
    queryClient.invalidateQueries({ queryKey: queryKeys[key] || key });

  const { data: schedulePayments } = useQuery({
    queryKey: [user?.email, "repayment-schedule", loan?.loan_id],
    queryFn: () => fundingEndpoints.repaymentSchedule(loan),
    select: (response) =>
      response?.data?.data?.slice(1) as RepaymentSchedule[],
    enabled: enabled && Number(status) === 2 && !!loan?.loan_id,
  });

  return {
    user,
    alternativeStatus, 
    status,           
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
