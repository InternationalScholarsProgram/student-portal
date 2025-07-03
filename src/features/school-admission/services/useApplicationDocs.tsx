import { useMemo } from "react";
import { BASE_URL } from "../../../services/api/base";
import { Consent, DocRequirements, UploadedDocument } from "../types/types";
import { admissionAPIs } from "./admissionAPIs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const sampleLinkBaseUrl = `${BASE_URL}/login/member/dashboard/school_app_docs/samples/`;

const useApplicationDocs = (schoolId?: string, courseId?: string) => {
  const queryKeys = {
    appDocs: ["admission", "app_docs_requirements", schoolId, courseId],
    consents: ["admission", "consents", schoolId, courseId],
    uploadedDocs: ["admission", "getUploadedDocs"],
  };

  const appDocs = useQuery<DocRequirements[]>({
    queryKey: queryKeys.appDocs,
    queryFn: () => admissionAPIs.applicationDocs(schoolId, courseId),
    enabled: Boolean(schoolId && courseId),
    refetchOnWindowFocus: false,
  });

  const uploadedDocsQuery = useQuery<UploadedDocument[]>({
    queryKey: queryKeys.uploadedDocs,
    queryFn: admissionAPIs.getUploadedDocs,
    refetchOnWindowFocus: false,
  });

  const consentsQuery = useQuery({
    queryKey: queryKeys.consents,
    queryFn: () => admissionAPIs.consents(schoolId, courseId),
    select: (response) => {
      const schoolConsents = response?.[0].data?.message || [];
      const programConsents = response?.[1].data?.message || [];
      const data: Consent[] = [...schoolConsents, ...programConsents];
      return data;
    },
    enabled: Boolean(schoolId && courseId),
    refetchOnWindowFocus: false,
  });
  const isFetching =
    appDocs.isFetching ||
    consentsQuery.isFetching ||
    uploadedDocsQuery.isFetching;
  const isLoading =
    appDocs.isFetching ||
    consentsQuery.isFetching ||
    uploadedDocsQuery.isFetching;

  const uploadedDocs = uploadedDocsQuery.data;

  const sortedAppDocs = useMemo(() => {
    if (isLoading || isFetching || !appDocs?.data?.length) return [];

    const appDocItem = appDocs?.data?.find((item) => item.id === "12");
    const requirementDocs: any =
      appDocs?.data
        ?.map((item) => {
          if (item?.id === "13") return null; //gpa
          if (item?.id === "12") return null; //any other docs

          const _docs = uploadedDocs?.filter((uploadedDoc) => {
            return item?.id === "3"
              ? courseId === uploadedDoc?.course?.course
              : item?.id === "15"
              ? item?.doc_id?.toString() === uploadedDoc?.comment
              : item?.id === uploadedDoc.doc_id?.toString();
          });
          return {
            ...item,
            docs: _docs?.[_docs.length - 1],
          };
        })
        .filter(Boolean) || [];

    const anyOtherDocs = uploadedDocs?.filter((item) => item.doc_id === 12);
    if (anyOtherDocs?.length && appDocItem) {
      const updatedAnyOtherDoc = anyOtherDocs.map((item) => ({
        ...appDocItem,
        description: item?.comment,
        docs: item,
      }));
      requirementDocs.push(...updatedAnyOtherDoc);
    }

    if (consentsQuery.data?.length) {
      const doc = uploadedDocs?.filter((item) => item.doc_id === 14);
      const consents =
        consentsQuery.data
          ?.map((consent, index) => {
            const foundDoc = doc?.find(
              (item) => item.comment === consent.id.toString()
            );
            return {
              id: "14",
              consent: consent,
              docs: foundDoc,
              description: consent?.description,
              item_name: `School Consent ${index + 1}`,
              sample_link: consent?.URL,
              acronym: "School Consent",
              doc_id: "",
            };
          })
          .filter(Boolean) || [];
      requirementDocs.push(...consents);
    }

    const reqDocs: DocRequirements[] = requirementDocs.map(
      (item: any, index: number) => ({
        ...item,
        uniqueId: index + 1,
        sample_link: item?.consent?.id
          ? item?.sample_link
          : sampleLinkBaseUrl + item?.sample_link,
      })
    );

    return reqDocs;
  }, [isLoading, isFetching, schoolId, courseId]);

  const queryClient = useQueryClient();
  const invalidateQuery = () => uploadedDocsQuery.refetch();
  // queryClient.invalidateQueries({ queryKey: queryKeys.uploadedDocs });

  return {
    requirementDocs: sortedAppDocs,
    invalidateQuery,
    isLoading,
    isFetching,
  };
};

export default useApplicationDocs;
