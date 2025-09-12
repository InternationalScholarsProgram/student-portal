import { useQuery, useQueryClient } from "@tanstack/react-query";
import { admissionAPIs } from "./admissionAPIs";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import { GPAReport, TranscriptsProps } from "../types/types";
import { useMemo } from "react";
import useSchools from "./useSchools";

const useAdmissions = () => {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const admissionKey = ["admission", user?.email];
  const queryKeys = useMemo(
    () => ({
      eligibility: [...admissionKey, "check_eligibility"],
      intakes: [...admissionKey, "intakes"],
      transcripts: [...admissionKey, "transcripts"],
      gpaReport: [...admissionKey, "gpaReport"],
    }),
    [user?.email]
  );

  const { data: eligibility, isLoading: isLoadingEligibility } = useQuery({
    queryKey: queryKeys.eligibility,
    queryFn: admissionAPIs.eligibilityCheck,
  });

  const isEligible = eligibility?.status === "success";
  const {
    appliedSchools,
    hasAppliedToAllSchools,
    isLoading,
    notAppliedSchools,
    proposedSchools,
    schoolAppId,
    admissionStatus: status,
    invalidate: invalidateStatus,
  } = useSchools(isEligible);

  const { data: gpaReport } = useQuery<GPAReport>({
    queryKey: queryKeys.gpaReport,
    queryFn: admissionAPIs.getGPA,
  });

  const { data: currentIntake } = useQuery({
    queryKey: queryKeys.intakes,
    queryFn: admissionAPIs.getCurrentIntake,
    enabled: isEligible,
  });

  const { data: _transcripts, isLoading: transcriptsLoading } = useQuery({
    queryKey: queryKeys.transcripts,
    queryFn: async () => admissionAPIs.transcripts(schoolAppId),
    enabled: Boolean(schoolAppId),
  });
  const transcripts = _transcripts?.data?.message as TranscriptsProps;

  const hasAnyVerified =
    transcripts?.request?.status === "2" ||
    transcripts?.requirements?.some((item) => item.ver_status === "2");

  const canMakeSchoolApplication = status?.code === 5 && hasAnyVerified;

  return {
    eligibility,
    isLoadingEligibility,
    currentIntake,
    status,
    user,
    proposedSchools,
    appliedSchools,
    notAppliedSchools,
    hasAppliedToAllSchools,
    isLoading: isLoading || transcriptsLoading,
    gpaReport: {
      ...gpaReport,
      // gpa_status: 2,
      // gpa: 3.5,
      // gpa_remark: "Please provide valid transcripts",
      // status: gpaReport?.gpa_status ? gpaReport?.gpa_status - 1 : null,
      document_name: gpaReport?.gpa_doc,
    },
    queryKeys,
    queryClient,
    schoolAppId,
    transcripts: {
      ...transcripts,
      hasAnyVerified,
    },
    canMakeSchoolApplication,
    invalidateStatus,
  };
};

export default useAdmissions;
