import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import tuitionEndpoints from "./tuitionEndpoints";
import {
  CreditReview,
  FundingAdvisoryProps,
  LoanDetailsProps,
} from "../../../types/fundingTypes";
type KeyProps =
  | "tuitionStatus"
  | "mpower"
  | "sallieMaeCosigner"
  | "sallieMaeApplication";

function useTuition() {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();

  const querKeys: Record<KeyProps, any[]> = {
    tuitionStatus: [user?.email, "tuition", "tuitionStatus"],
    mpower: [user?.email, "tuition", "mpower-status"],
    sallieMaeCosigner: [user?.email, "tuition", "sallieMae-cosigner"],
    sallieMaeApplication: [user?.email, "tuition", "sallieMae-cosigner"],
  };
  const {
    data: tuitionData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: querKeys.tuitionStatus,
    queryFn: tuitionEndpoints.getStatus,
    select: (response) => {
      return response?.data?.data;
    },
    retry: 0,
  });

  const tuitionStatus = tuitionData?.status || 0;
  const creditReview = tuitionData?.credit_review as CreditReview | null;
  const fundingAdvisory = tuitionData?.funding_advisory as FundingAdvisoryProps;

  const fundingDateAndTime = () => {
    if (!fundingAdvisory?.date) return null;
    const date = new Date(fundingAdvisory?.date);
    const time: any = fundingAdvisory?.time?.split(":");
    date.setHours(time?.[0], time?.[1]);
    return date;
  };

  const loanDetails: LoanDetailsProps[] = tuitionData?.loan_app_details;
  const activeLoanApplication =
    loanDetails?.find((loan) => !loan.application_details?.loan_app_feedback) ||
    loanDetails?.[0];

  const invalidate = (key: KeyProps) =>
    queryClient.invalidateQueries({ queryKey: querKeys[key] });
  const inValidateStatus = () => invalidate("tuitionStatus");

  return {
    tuitionData,
    tuitionStatus,
    creditReview,
    fundingAdvisory: {
      ...fundingAdvisory,
      dateAndTime: fundingDateAndTime(),
    },
    activeLoanApplication,
    loanDetails,
    loanFeedback: activeLoanApplication?.loan_app_feedback,
    schoolAppId: activeLoanApplication?.app_id,
    isLoading,
    isError,
    error: error as any,
    stage: 2,
    queryClient,
    user,
    loanType: user ? "mpower" : "sallie mae",
    inValidateStatus,
    invalidate,
    querKeys,
  };
}

export default useTuition;
