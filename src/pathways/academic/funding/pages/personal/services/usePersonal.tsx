import React, { useMemo } from "react";
import useFetchUser from "../../../../../../services/hooks/useFetchUser";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import personalEndpoints from "./personalEndpoints";
import fundingEndpoints from "../../../services/fundingEndpoints";
import { RepaymentSchedule } from "../../../types/fundingTypes";

type Options = { enabled?: boolean };

const _queryKeys = (email: any) => ({
  status: [email, "personal-loans"] as const,
});

const usePersonal = (options: Options = {}) => {
  const { enabled = true } = options;
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
    enabled: !!user?.email && enabled,
    select: (response) => response?.data?.data,
  });

  // Submit application
  const {
    mutate: submitApplication,
    isPending: isSubmittingApplication,
    error: submitApplicationError,
  } = useMutation({
    mutationFn: (payload: FormData) => personalEndpoints.application(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.status });
    },
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
      return (
        data
          ?.map((row: any) => ({
            ...row,
            no: row.id - 1,
          }))
          .slice(1) as RepaymentSchedule[]
      );
    },
    enabled: enabled && !!personalLoan?.loan_id && status?.status === 2,
  });

  return {
    status,
    isLoading: isLoading || isLoadingSchedule,
    error: error || errorSchedule,

    submitApplication,
    isSubmittingApplication,
    submitApplicationError,

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
