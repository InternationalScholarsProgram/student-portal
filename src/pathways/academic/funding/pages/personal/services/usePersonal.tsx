import React, { useMemo } from "react";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import personalEndpoints from "./personalEndpoints";
import { loanType } from "../../../utils";
import fundingEndpoints from "../../../services/fundingEndpoints";
import { RepaymentSchedule } from "../../../types/fundingTypes";

const usePersonal = () => {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  const {
    data: status,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys?.status,
    queryFn: personalEndpoints?.status,
    enabled: !!user?.email,
    select: (response) => response?.data?.data,
  });

  const invalidate = (key: "status") =>
    queryClient.invalidateQueries({ queryKey: queryKeys[key] });

  const user_details = status?.user_details;
  const personalLoan = status?.personal_loan;
  const supplementary = status?.supplementary_loan;

  const {
    data: schedulePayments,
    isLoading: isLoadingSchedule,
    error: errorSchedule,
  } = useQuery({
    queryKey: [user?.email, "repayment-schedule", personalLoan?.loan_id],
    queryFn: () => fundingEndpoints.repaymentSchedule(personalLoan),
    select: (response) => {
      const data = response?.data?.data;
      return data
        ?.map((row: any) => ({
          ...row,
          no: row.id - 1,
        }))
        .slice(1) as RepaymentSchedule[];
    },
    enabled: !!personalLoan?.loan_id && status?.status === 2,
  });

  return {
    status,
    isLoading: isLoading || isLoadingSchedule,
    error: error || errorSchedule,
    invalidate,
    user_details,
    personalLoan,
    user,
    loanType: 2,
    schedulePayments,
    supplementary,
  };
};

export default usePersonal;

const _queryKeys = (email: any) => ({
  status: [email, "personal-loans"] as const,
});
