import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import { admissionAPIs } from "./admissionAPIs";
import { School } from "../types/types";

function useSchools(isEligible: boolean) {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();

  const { data: status, isLoading } = useQuery({
    queryKey: ["admission", user?.email, "status_check"],
    queryFn: admissionAPIs.statusCheck,
    enabled: isEligible && !!user?.email,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["admission", user?.email, "status_check"],
    });

  const schoolAppId = status?.message?.school_app_id ?? null;

  const proposedSchools: School[] = status?.message?.proposed_courses;
  const appliedSchools = proposedSchools?.filter(
    (item) => item?.application_status === "applied"
  );
  const notAppliedSchools = proposedSchools?.filter(
    (item) => item?.SOP_status === "2" && item?.application_status !== "applied"
  );
  const hasAppliedToAllSchools = proposedSchools?.every(
    (item) => item?.application_status === "applied"
  );
  const schoolsWithFeedback = appliedSchools?.filter(
    (item) => item?.application_details?.feedback
  );
  return {
    admissionStatus: status,
    isLoading,
    schoolAppId,
    proposedSchools,
    appliedSchools,
    notAppliedSchools,
    hasAppliedToAllSchools,
    schoolsWithFeedback,
    invalidate,
  };
}

export default useSchools;
