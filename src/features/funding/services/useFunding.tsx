import { useQuery, useQueryClient } from "@tanstack/react-query";
import fundingEndpoints from "./fundingEndpoints";
import useSchools from "../../school-admission/services/useSchools";
import { fetchIp } from "../../../utils/utils";

function useFunding() {
  const { schoolsWithFeedback, schoolAppId } = useSchools(true);
  const queryClient = useQueryClient();

  const { data: status } = useQuery({
    queryKey: ["funding"],
    queryFn: fetchIp,
  });

  const schoolsEligibleForFunding = schoolsWithFeedback?.map((item) => ({
    ...item,
    feedback: item?.application_details?.feedback,
    fundingStatus: item?.application_details?.feedback?.status,
  }));

  return {
    status,
    stage: status ? 1 : 2,
    schools: schoolsEligibleForFunding,
    selectedSchool: schoolsEligibleForFunding?.[0],
    schoolAppId,
    queryClient,
  };
}

export default useFunding;
