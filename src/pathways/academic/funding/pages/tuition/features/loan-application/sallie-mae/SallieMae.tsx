import { useQuery } from "@tanstack/react-query";
import useTuition from "../../../services/useTuition";
import { CosignerStatus } from "./CosignerStatus";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import { FullLoader } from "../../../../../../../../components/loaders/Loader";
import { MyAxiosError } from "../../../../../../../../types";
import LoanStatus from "./LoanStatus";
import AxiosError from "../../../../../../../../components/errors/AxiosError";

function SallieMae() {
  const { querKeys, activeLoanApplication } = useTuition();
  const {
    data: cosigner,
    isLoading,
    error,
  } = useQuery<any, MyAxiosError>({
    queryKey: querKeys.sallieMaeCosigner,
    queryFn: () => tuitionEndpoints.getCosigners(activeLoanApplication?.app_id),
    enabled: !!activeLoanApplication?.app_id,
    select: (response) => response?.data?.data,
  });

  if (isLoading) return <FullLoader />;
  if (error) return <AxiosError error={error} />;
  return (
    <div>
      {cosigner?.status !== 4 ? (
        <CosignerStatus cosigner={cosigner} />
      ) : (
        <LoanStatus />
      )}
    </div>
  );
}

export default SallieMae;
