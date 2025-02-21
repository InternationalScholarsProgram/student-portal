import { useQuery, useQueryClient } from "@tanstack/react-query";
import { admissionAPIs } from "./admissionAPIs";
import useFetchUser from "../../../services/hooks/useFetchUser";

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
    enabled: status?.code >= 2,
  });
  const { data: uploadedDocs } = useQuery({
    queryKey: queryKeys.uploadedDocs,
    queryFn: admissionAPIs.getUploadedDocs,
    enabled: !!appDocs,
  });
  const { data: currentIntake } = useQuery({
    queryKey: queryKeys.intakes,
    queryFn: admissionAPIs.getCurrentIntake,
    enabled: eligible,
  });
  const { data: consents } = useQuery({
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

  const consentsWithSchool = consents?.map((consent: any) => {
    const school = proposedSchools?.find(
      (school: any) => school.school_id === consent?.school_id?.toString()
    );

    const uploadedDocById = uploadedDocs
      ?.filter((uploadedDoc: any) => uploadedDoc.doc_id?.toString() === "14")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ?.map(({ id, item_name, ...other }: any) => other);

    const filterUploadedDocs = uploadedDocById?.find(
      (doc: any) => doc?.comment === consent?.school_id?.toString()
    );

    return {
      school: school,
      consent: consent,
      document: filterUploadedDocs,
    };
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
    consentsWithSchool,
    queryClient,
    invalidateDocs,
  };
};

export default useAdmissions;
