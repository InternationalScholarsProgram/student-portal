import { useQuery, useQueryClient } from "@tanstack/react-query";
import visaEndpoints from "../visaEndpoints";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import useAdmissions from "../../../school-admission/services/useAdmissions";

function useVisa() {
  const { appliedSchools } = useAdmissions();
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
    (school: any) => !school?.application_details?.feedback //add the correct flter
  );
  const visa = status?.value?.visa;
  const ds160Req = status?.value?.ds160req;
  const ds160Review = status?.value?.ds160review;
  const hasPaidedForVisa = !!visa?.payment;

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
    hasPaidedForVisa,
  };
}

export default useVisa;
