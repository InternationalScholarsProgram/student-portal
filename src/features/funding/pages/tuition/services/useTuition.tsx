import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import tuitionEndpoints from "./tuitionEndpoints";
import {
  CreditReview,
  FundingAdvisoryProps,
  LoanDetailsProps,
} from "../../../types/fundingTypes";

function useTuition() {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();

  const querKeys = {
    tuitionStatus: [user?.email, "tuition", "tuitionStatus"],
    mpower: [user?.email, "tuition", "mpower-status"],
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
    if (fundingAdvisory?.date) {
      const date = new Date(fundingAdvisory?.date);
      const time: any = fundingAdvisory?.time?.split(":");
      date.setHours(time[0], time[1]);
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return date.toLocaleString("en-US", options);
    }
  };

  const loanDetails: LoanDetailsProps[] = tuitionData?.loan_app_details;
  const activeLoanApplication =
    loanDetails?.find((loan) => loan.app_id) || loanDetails?.[0];

  const invalidate = (key: "tuitionStatus" | "mpower") =>
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
    loanDetails,
    activeLoanApplication,
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
