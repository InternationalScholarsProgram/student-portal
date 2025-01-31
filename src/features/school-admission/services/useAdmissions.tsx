import { useQuery } from "@tanstack/react-query";
import { admissionAPIs } from "./functions";
import useFetchUser from "../../../services/hooks/useFetchUser";

const useAdmissions = () => {
  const { user } = useFetchUser();
  const admissionKey = ["admission", user?.email];
  const queryKeys = {
    eligibility: [...admissionKey, "check_eligibility"],
    statusCheck: [...admissionKey, "status_check"],
    appDocs: [...admissionKey, "fetch_school_app_docs_requirements"],
    uploadedDocs: [...admissionKey, "getUploadedDocs"],
    intakes: [...admissionKey, "intakes"],
  };
  const { data: eligibility }: any = useQuery({
    queryKey: queryKeys.eligibility,
    queryFn: admissionAPIs.eligibilityCheck,
  });

  const eligible = eligibility?.status === "success";

  const { data: status, isLoading } = useQuery({
    queryKey: queryKeys.statusCheck,
    queryFn: admissionAPIs.statusCheck,
    enabled: eligible,
  });

  const proposedSchools = status?.message?.proposed_courses || [];
  
  const appliedSchools = proposedSchools?.filter(
    (item: any) => item?.application_status === "applied"
  );
  const notAppliedSchools = proposedSchools?.filter(
    (item: any) =>
      item?.SOP_status === "2" && item?.application_status !== "applied"
  );
  const hasAppliedToAllSchools = proposedSchools?.every(
    (item: any) => item?.application_status === "applied"
  );

  const { data: appDocs } = useQuery({
    queryKey: queryKeys.appDocs,
    queryFn: admissionAPIs.applicationDocs,
    enabled: eligible,
  });
  const { data: uploadedDocs } = useQuery({
    queryKey: queryKeys.uploadedDocs,
    queryFn: admissionAPIs.getUploadedDocs,
    enabled: eligible,
  });
  const { data: currentIntake } = useQuery({
    queryKey: queryKeys.intakes,
    queryFn: admissionAPIs.getCurrentIntake,
    enabled: eligible,
  });

  return {
    eligibility,
    currentIntake,
    appDocs,
    status,
    user,
    proposedSchools,
    appliedSchools,
    notAppliedSchools,
    hasAppliedToAllSchools,
    isLoading,
    uploadedDocs,
    queryKeys,
  };
};

export default useAdmissions;
