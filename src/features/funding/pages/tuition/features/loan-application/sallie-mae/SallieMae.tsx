import { useQuery } from "@tanstack/react-query";
import useTuition from "../../../services/useTuition";
import { CosignerStatus } from "./CosignerStatus";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import { FullLoader } from "../../../../../../../components/loaders/Loader";
import { MyAxiosError } from "../../../../../../../types";
import SallieApplicationForm from "./SallieApplicationForm";
import ContentComponent from "../../../../../../../components/ContentComponent";
import LoanStatus from "./LoanStatus";

function SallieMae() {
  const { querKeys, activeLoanApplication } = useTuition();
  const { data, isLoading, error } = useQuery<any, MyAxiosError>({
    queryKey: querKeys.sallieMae,
    queryFn: () => tuitionEndpoints.getCosigners(activeLoanApplication?.app_id),
    enabled: !!activeLoanApplication?.app_id,
    select: (response) => response?.data?.data,
  });

  if (isLoading) return <FullLoader />;
  if (error)
    return <p>Something went wrong {error?.response?.data?.message}</p>;

  return (
    <div>
      <CosignerStatus
        status={data?.status}
        remarks={data?.remarks || "Co-signer details not found"}
      />

      {data?.status === 4 && <LoanStatus status={0} />}
    </div>
  );
}

export default SallieMae;
