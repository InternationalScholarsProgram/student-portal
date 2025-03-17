import { useQuery, useQueryClient } from "@tanstack/react-query";
import fundingEndpoints from "./fundingEndpoints";
import useSchools from "../../school-admission/services/useSchools";

function useFunding() {
  const { schoolsWithFeedback } = useSchools(true);
  const queryClient = useQueryClient();

  const { data: status } = useQuery({
    queryKey: ["funding"],
    queryFn: fundingEndpoints.getStatus,
  });

  const schoolsEligibleForFunding = schoolsWithFeedback?.map((item) => ({
    ...item,
    feedback: item?.application_details?.feedback,
    fundingStatus: item?.application_details?.feedback?.status,
  }));


  return {
    status,
    stage: status ? 2 : 2,
    schools: schoolsEligibleForFunding,
    school: schoolsEligibleForFunding?.[0],
    queryClient,
  };
}

export default useFunding;
