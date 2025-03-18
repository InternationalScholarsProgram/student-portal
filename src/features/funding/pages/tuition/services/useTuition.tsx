import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../../services/hooks/useFetchUser";
import tuitionEndpoints from "./tuitionEndpoints";
import useFunding from "../../../services/useFunding";
import { MpowerStatus } from "../../../types/fundingTypes";

function useTuition() {
  const { user } = useFetchUser();
  const { selectedSchool } = useFunding();
  const queryClient = useQueryClient();

  const querKeys = {
    tuitionStatus: [user?.email, "tuition", "tuitionStatus"],
    mpower: [user?.email, "tuition", "mpower-status"],
  };
  const { data: tuitionStatus } = useQuery<any>({
    queryKey: querKeys.tuitionStatus,
    queryFn: tuitionEndpoints.getStatus,
    select: (response) => response?.data?.data?.status,
  });
  const inValidateStatus = () =>
    queryClient.invalidateQueries({ queryKey: querKeys.tuitionStatus });

  const { data: mpowerStatus } = useQuery({
    queryKey: querKeys.mpower,
    queryFn: () => tuitionEndpoints.mpowerStatus(selectedSchool?.id),
    enabled: !!selectedSchool?.id,
    select: (response) => response?.data?.data as MpowerStatus | null,
  });
  const inValidateMpowerStatus = () =>
    queryClient.invalidateQueries({ queryKey: querKeys.mpower });

  return {
    tuitionStatus,
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
