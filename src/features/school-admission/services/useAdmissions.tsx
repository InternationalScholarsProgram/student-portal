import { useQuery, useQueryClient } from "@tanstack/react-query";
import { admissionAPIs } from "./admissionAPIs";
import useFetchUser from "../../../services/hooks/useFetchUser";
import {
  Consent,
  DocRequirements,
  School,
  SchoolConsentDocumentArray,
  UploadedDocument,
} from "../types/types";

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
  };
  const invalidateDocs = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.uploadedDocs });
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
  const schoolAppId = status?.message?.school_app_id;

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
  appDocs?.sort((a, b) => {
    if (a.id === "3") return 1; // a should come after b
    if (b.id === "3") return -1; // b should come after a
    return 0; // otherwise, keep original order
  });

  const { data: uploadedDocs } = useQuery<UploadedDocument[]>({
    queryKey: queryKeys.uploadedDocs,
    queryFn: admissionAPIs.getUploadedDocs,
    enabled: !!appDocs,
  });

  const { data: currentIntake } = useQuery({
    queryKey: queryKeys.intakes,
    queryFn: admissionAPIs.getCurrentIntake,
    enabled: eligible,
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
      const uploadedDocById = uploadedDocs
        ?.filter((uploadedDoc) => uploadedDoc.doc_id?.toString() === "14")
        ?.map(({ id: _id, ...rest }) => rest); // Remove the 'id' property

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
    consentsWithSchool,
    queryClient,
    schoolAppId,
    invalidateDocs,
  };
};

export default useAdmissions;
