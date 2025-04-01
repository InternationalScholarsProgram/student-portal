import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Consent, SchoolConsentDocumentArray } from "../types/types";
import { admissionAPIs } from "./admissionAPIs";
import useAdmissions from "./useAdmissions";

function useAdmissionConsents() {
  const { proposedSchools, uploadedDocs, queryKeys } = useAdmissions();

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

  const consentsWithSchool = useMemo(() => {
    return consents
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
  }, [consents, uploadedDocs]);
  return {
    consentsWithSchool,
  };
}

export default useAdmissionConsents;
