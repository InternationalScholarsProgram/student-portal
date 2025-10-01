import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fundingEndpoints from "./fundingEndpoints";
import useSchools from "../../school-admission/services/useSchools";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import { RepaymentSchedule } from "../types/fundingTypes";

type Keys = "app";

type Props = {
  loan?: any;
};

const _queryKeys = (email: any) => ({
  app: [email, "funding", "application-details"],
});

const useFunding = ({ loan = {} }: Props) => {
  const { user } = useFetchUser();
  const { schoolsWithFeedback, schoolAppId } = useSchools(true);
  const queryClient = useQueryClient();

  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  const {
    data: applicationDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.app,
    queryFn: fundingEndpoints.getApplicationDetails,
    select: (response) => response?.data?.data,
  });

  const invalidate = (key: Keys) =>
    queryClient.invalidateQueries({
      queryKey: queryKeys[key],
    });

  const schoolsEligibleForFunding = schoolsWithFeedback?.map((item) => ({
    ...item,
    feedback: item?.application_details?.feedback,
    fundingStatus: item?.application_details?.feedback?.status,
  }));

  const {
    data: schedulePayments,
    isLoading: isLoadingSchedule,
    error: errorSchedule,
  } = useQuery({
    queryKey: [user?.email, "repayment-schedule", loan?.loan_id],
    queryFn: () => fundingEndpoints.repaymentSchedule(loan),
    select: (response) => {
      const data = response?.data?.data;
      return data
        ?.map((row: any) => ({
          ...row,
          no: row.id - 1,
        }))
        .slice(1) as RepaymentSchedule[];
    },
    enabled: !!loan?.loan_id,
  });

  const {
    data: loanBalance,
    isLoading: isLoadingBalance,
    error: errorBalance,
  } = useQuery({
    queryKey: [user?.email, "loan-balance", loan?.loan_id],
    queryFn: () => fundingEndpoints.getLoanBalance(loan?.loan_id),
    select: (response) =>
      response?.data?.message ?? response?.data?.data, 
    enabled: !!loan?.loan_id,
  });

const startManualPayment = async (amount: number) => {
  if (!user?.email || !loan?.loan_id) {
    throw new Error("Missing required email or loan_id.");
  }
  const res = await fundingEndpoints.initManualPayment({
    payment_amount: amount,
    email: user.email,
    loan_id: loan.loan_id,
  });

  
  const payload = res?.data?.data ?? res?.data?.message ?? {};
  return payload; 
};


  return {
    applicationDetails,
    schools: schoolsEligibleForFunding,
    selectedSchool: schoolsEligibleForFunding?.[0],
    schoolAppId,
    queryClient,

    isLoading: isLoading || isLoadingSchedule || isLoadingBalance,
    error: error || errorSchedule || errorBalance,

    invalidate,
    schedulePayments,
    loanBalance,          
    startManualPayment,   
  };
};

export default useFunding;
