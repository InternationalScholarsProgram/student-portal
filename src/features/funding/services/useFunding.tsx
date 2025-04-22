import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fundingEndpoints from "./fundingEndpoints";
import useSchools from "../../school-admission/services/useSchools";
import useFetchUser from "../../../services/hooks/useFetchUser";

type Keys = "app";

const _queryKeys = (email: any) => ({
  app: [email, "funding", "application-details"],
});

function useFunding() {
  const { user } = useFetchUser();
  const { schoolsWithFeedback, schoolAppId } = useSchools(true);
  const queryClient = useQueryClient();

  const queryKeys = useMemo(() => _queryKeys(user?.email), [user?.email]);

  const { data: applicationDetails, isLoading } = useQuery({
    queryKey: queryKeys?.app,
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

  return {
    applicationDetails,
    schools: schoolsEligibleForFunding,
    selectedSchool: schoolsEligibleForFunding?.[0],
    schoolAppId,
    queryClient,
    isLoading,
    invalidate,
  };
}

export default useFunding;
