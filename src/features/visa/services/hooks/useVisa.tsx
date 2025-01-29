import { useQuery } from "@tanstack/react-query";
import visaEndpoints from "../visaEndpoints";

function useVisa() {
  const { data: applicationVideo } = useQuery({
    queryKey: ["visa", "ds-160-application-video"],
    queryFn: visaEndpoints.ds_160_application_video,
  });
  const { data: schools } = useQuery({
    queryKey: ["visa", "schools"],
    queryFn: visaEndpoints.schools,
  });

  return {
    applicationVideo,
    schools,
  };
}

export default useVisa;
