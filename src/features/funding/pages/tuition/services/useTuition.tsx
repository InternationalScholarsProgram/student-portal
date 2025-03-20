import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import tuitionEndpoints from "./tuitionEndpoints";
import useFunding from "../../../services/useFunding";
import {
  CreditReview,
  FundingAdvisoryProps,
  LoanDetailsProps,
  MpowerStatus,
} from "../../../types/fundingTypes";

function useTuition() {
  const { user } = useFetchUser();
  const { selectedSchool } = useFunding();
  const queryClient = useQueryClient();

  const querKeys = {
    tuitionStatus: [user?.email, "tuition", "tuitionStatus"],
    mpower: [user?.email, "tuition", "mpower-status"],
  };
  const { data: tuitionData, isLoading } = useQuery({
    queryKey: querKeys.tuitionStatus,
    queryFn: tuitionEndpoints.getStatus,
    select: (response) => {
      return response?.data?.data;
    },
  });

  const tuitionStatus = tuitionData?.status || 0;
  const creditReview = tuitionData?.credit_review as CreditReview | null;
  const fundingAdvisory =
    tuitionData?.funding_advisory as FundingAdvisoryProps | null;
  const loanDetails: LoanDetailsProps[] = tuitionData?.loan_app_details;
  const activeLoanApplication = loanDetails?.find((loan) => loan.app_id) || loanDetails?.[0];

  const inValidateStatus = () =>
    queryClient.invalidateQueries({ queryKey: querKeys.tuitionStatus });

  const { data: mpowerStatus } = useQuery({
    queryKey: querKeys.mpower,
    queryFn: () => tuitionEndpoints.mpowerStatus(activeLoanApplication?.app_id),
    enabled: !!activeLoanApplication?.app_id && tuitionStatus > 6,
    select: (response) => response?.data?.data as MpowerStatus | null,
  });

  const inValidateMpowerStatus = () =>
    queryClient.invalidateQueries({ queryKey: querKeys.mpower });

  return {
    tuitionData,
    tuitionStatus,
    creditReview,
    fundingAdvisory,
    loanDetails,
    activeLoanApplication,
    isLoading,
    stage: 2,
    queryClient,
    user,
    loanType: user ? "mpower" : "sallie mae",
    inValidateStatus,
    mpowerStatus,
    inValidateMpowerStatus,
  };
}

export default useTuition;
