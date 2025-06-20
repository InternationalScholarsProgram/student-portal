import { useQuery, useQueryClient } from "@tanstack/react-query";
import { admissionAPIs } from "./admissionAPIs";
import useFetchUser from "../../../services/hooks/useFetchUser";
import {
  DocRequirements,
  GPAReport,
  School,
  TranscriptsProps,
  UploadedDocument,
} from "../types/types";
import { useMemo } from "react";
import useSchools from "./useSchools";

const useAdmissions = () => {
  const { user } = useFetchUser();

  const queryClient = useQueryClient();
  const admissionKey = ["admission", user?.email];
  const queryKeys = useMemo(
    () => ({
      eligibility: [...admissionKey, "check_eligibility"],
      appDocs: [...admissionKey, "fetch_school_app_docs_requirements"],
      uploadedDocs: [...admissionKey, "getUploadedDocs"],
      intakes: [...admissionKey, "intakes"],
      consents: [...admissionKey, "consents"],
      transcripts: [...admissionKey, "transcripts"],
      gpaReport: [...admissionKey, "gpaReport"],
    }),
    [user?.email]
  );
  const invalidateDocs = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.uploadedDocs });
  };
  const { data: eligibility }: any = useQuery({
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

  const { data: appDocs } = useQuery<DocRequirements[]>({
    queryKey: queryKeys.appDocs,
    queryFn: admissionAPIs.applicationDocs,
    enabled: status?.code >= 2,
  });

  const sortedAppDocs = useMemo(() => {
    if (!appDocs) return [];
    return [...appDocs].sort((a, b) => {
      if (a.id === "3") return 1; // a should come after b
      if (b.id === "3") return -1; // b should come after a
      return 0; // otherwise, keep original order
    });
  }, [appDocs]);

  const { data: uploadedDocs } = useQuery<UploadedDocument[]>({
    queryKey: queryKeys.uploadedDocs,
    queryFn: admissionAPIs.getUploadedDocs,
    enabled: !!appDocs,
  });
  
  const { data: gpaReport } = useQuery<GPAReport>({
    queryKey: queryKeys.gpaReport,
    queryFn: admissionAPIs.getGPA,
    enabled: !!uploadedDocs,
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
    currentIntake,
    appDocs: sortedAppDocs,
    status,
    user,
    proposedSchools,
    appliedSchools,
    notAppliedSchools,
    hasAppliedToAllSchools,
    isLoading: isLoading || transcriptsLoading,
    uploadedDocs,
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
    invalidateDocs,
    invalidateStatus,
  };
};

export default useAdmissions;
