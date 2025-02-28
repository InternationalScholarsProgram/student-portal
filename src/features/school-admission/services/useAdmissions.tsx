import { useQuery, useQueryClient } from "@tanstack/react-query";
import { admissionAPIs } from "./admissionAPIs";
import useFetchUser from "../../../services/hooks/useFetchUser";
import {
  Consent,
  DocRequirements,
  GPAReport,
  School,
  SchoolConsentDocumentArray,
  TranscriptsProps,
  UploadedDocument,
} from "../types/types";
import { useCallback, useMemo } from "react";

const useAdmissions = () => {
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const admissionKey = ["admission", user?.email];
  const queryKeys = {
    eligibility: [...admissionKey, "check_eligibility"],
    statusCheck: [...admissionKey, "status_check"],
    appDocs: [...admissionKey, "fetch_school_app_docs_requirements"],
    uploadedDocs: [...admissionKey, "getUploadedDocs"],
    intakes: [...admissionKey, "intakes"],
    consents: [...admissionKey, "consents"],
    transcripts: [...admissionKey, "transcripts"],
    gpaReport: [...admissionKey, "gpaReport"],
  };
  const invalidateDocs = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.uploadedDocs });
  };
  const { data: eligibility }: any = useQuery({
    queryKey: queryKeys.eligibility,
    queryFn: admissionAPIs.eligibilityCheck,
  });

  const isEligible = eligibility?.status === "success";

  const { data: status, isLoading } = useQuery({
    queryKey: queryKeys.statusCheck,
    queryFn: admissionAPIs.statusCheck,
    enabled: isEligible,
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
  const { data: consents } = useQuery<Consent[] | null>({
    queryKey: queryKeys.consents,
    queryFn: async () => {
      try {
        if (!proposedSchools) {
          throw new Error("No proposed schools available");
        }

        const response = await Promise.all(
          proposedSchools.map(async (school: any) => {
            try {
              return await admissionAPIs.consents({
                id: school.school_id,
                course: school.course,
              });
            } catch (error) {
              console.error(
                `Error fetching consent for school ${school.school_id}:`,
                error
              );
              return null;
            }
          })
        );
        const filterdArray = response.filter(Boolean).flat(); // Remove null values if any API request failed

        return filterdArray.length > 0 ? filterdArray : null;
      } catch (error) {
        console.error("Failed to get consents:", error);
        return null;
      }
    },
    enabled: proposedSchools?.length > 0,
  });

  const consentsWithSchool = consents
    ?.map((consent) => {
      const school = proposedSchools?.find(
        (school) => school.school_id === consent?.school_id?.toString()
      );
      const uploadedDocById = uploadedDocs?.filter(
        (uploadedDoc) => uploadedDoc.doc_id?.toString() === "14"
      );
      const filterUploadedDocs = uploadedDocById?.find(
        (doc) => doc.comment === school?.course
      );

      return {
        school: school,
        consent: consent,
        document: filterUploadedDocs,
      };
    })
    .filter(Boolean) as SchoolConsentDocumentArray;

  const { data: _transcripts, isLoading: transcriptsLoading } = useQuery({
    queryKey: queryKeys.transcripts,
    queryFn: async () => admissionAPIs.transcripts(schoolAppId),
    enabled: Boolean(schoolAppId),
  });
  const transcripts = _transcripts?.data?.message as TranscriptsProps;

  const hasAnyVerified =
    transcripts?.requests?.some((item) => item.status === "2") ||
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
      gpa_status: 3,
      gpa: 3.5,
      gpa_remark: "Please provide valid transcripts",
      status: gpaReport?.gpa_status ? gpaReport?.gpa_status - 1 : null,
      document_name: gpaReport?.gpa_doc,
    },
    queryKeys,
    consentsWithSchool,
    queryClient,
    schoolAppId,
    transcripts: {
      ...transcripts,
      hasAnyVerified,
    },
    canMakeSchoolApplication,
    invalidateDocs,
  };
};

export default useAdmissions;
