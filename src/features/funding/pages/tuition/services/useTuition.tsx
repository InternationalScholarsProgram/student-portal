import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import tuitionEndpoints from "./tuitionEndpoints";
import useFunding from "../../../services/useFunding";
import {
  CreditReview,
  FundingAdvisoryProps,
  MpowerStatus,
} from "../../../types/fundingTypes";
import axios from "axios";

function useTuition() {
  const { user } = useFetchUser();
  const { selectedSchool } = useFunding();
  const queryClient = useQueryClient();

  const querKeys = {
    tuitionStatus: [ "tuition", "tuitionStatus"],
    mpower: [user?.email, "tuition", "mpower-status"],
  };
  const { data: tuitionData, isLoading } = useQuery({
    queryKey: querKeys.tuitionStatus,
    // queryFn: tuitionEndpoints.getStatus,
    queryFn: () => {
      const options = {
        method: "GET",
        url: "http://finkapinternational.qhtestingserver.com//login/member/dashboard/APIs/funding/tuition_status.php",
        params: {
          action: "track_status",
          student_id: "test@gmail.com",
        },
      };

      const response = axios.request(options);
      return response;
    },
    select: (response) => {
      return response?.data?.data;
    },
  });
  const tuitionStatus = tuitionData?.status || 0;
  const creditReview = tuitionData?.credit_review as CreditReview | null;
  const fundingAdvisory =
    tuitionData?.funding_advisory as FundingAdvisoryProps | null;

  const inValidateStatus = () =>
    queryClient.invalidateQueries({ queryKey: querKeys.tuitionStatus });

  const { data: mpowerStatus } = useQuery({
    queryKey: querKeys.mpower,
    queryFn: () => tuitionEndpoints.mpowerStatus(selectedSchool?.id),
    enabled: !!selectedSchool?.id && tuitionStatus > 6,
    select: (response) => response?.data?.data as MpowerStatus | null,
  });
  const inValidateMpowerStatus = () =>
    queryClient.invalidateQueries({ queryKey: querKeys.mpower });

  return {
    tuitionData,
    tuitionStatus,
    creditReview,
    fundingAdvisory,
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
