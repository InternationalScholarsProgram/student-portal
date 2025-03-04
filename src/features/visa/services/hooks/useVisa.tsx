import { useQuery, useQueryClient } from "@tanstack/react-query";
import visaEndpoints from "../visaEndpoints";
import useFetchUser from "../../../../services/hooks/useFetchUser";
// import useAdmissions from "../../../school-admission/services/useAdmissions";
import { Ds160Review, VisaObject } from "../../types/visaTypes";
import { useCallback, useMemo } from "react";

function useVisa() {
  // const { appliedSchools } = useAdmissions();
  const appliedSchools: any[] = [];
  const { user } = useFetchUser();
  const queryClient = useQueryClient();
  const queryKeys = {
    statusCheck: ["visa", "status-check"],
  };
  const inValidate = (queryKey: any) =>
    queryClient.invalidateQueries({ queryKey: queryKey });
  const inValidateStatus = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.statusCheck });

  const { data: status, isLoading } = useQuery({
    queryKey: queryKeys.statusCheck,
    queryFn: visaEndpoints.status,
  });

  const { data: applicationVideo } = useQuery({
    queryKey: ["visa", "ds-160-application-video"],
    queryFn: visaEndpoints.ds_160_application_video,
  });
  const schools = appliedSchools?.filter(
    (school) => !school?.application_details?.feedback
  );
  const getDate = useCallback(() => {
    const date = status?.value?.visa?.interview_date?.split("-").map(Number);
    return new Date(date?.[2], date?.[1] - 1, date?.[0]);
  }, [status?.value?.visa?.interview_date]);

  const visa: VisaObject = useMemo(
    () => ({
      ...status?.value?.visa,
      interview_date: getDate(),
    }),
    [status?.value?.visa]
  );

  const ds160Req = status?.value?.ds160req;
  const ds160Review = status?.value?.ds160review as Ds160Review;
  const visaPayments = status?.value?.payments;

  return {
    applicationVideo,
    schools: schools,
    user,
    status,
    isLoading,
    inValidate,
    inValidateStatus,
    stage: status?.stage || 0,
    visa,
    ds160Req,
    ds160Review,
    visaPayments,
  };
}

export default useVisa;
