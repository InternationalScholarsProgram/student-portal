import AxiosError from "../../../../components/errors/AxiosError";
import { FullLoader } from "../../../../components/loaders/Loader";
import ApplicationStatus from "./features/application/ApplicationStatus";
import useRelocation from "./services/useRelocation";
import LoanProcessing from "./features/processing/LoanProcessing";

function Relocation() {
  const { relocationStatus, isLoading, error } = useRelocation();
  if (isLoading) return <FullLoader />;
  if (error) return <AxiosError error={error} />;
return (
        <ApplicationStatus
          status={12}
          remarks={relocationStatus?.application?.remark}
        />
      );
  switch (relocationStatus?.status) {
    case 0:
      return (
        <ApplicationStatus
          status={relocationStatus?.application?.status}
          remarks={relocationStatus?.application?.remark}
        />
      );
    case 1:
      return <LoanProcessing />;
  }
}

export default Relocation;
