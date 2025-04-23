import usePersonal from "./services/usePersonal";
import { FullLoader } from "../../../../components/loaders/Loader";
import AxiosError from "../../../../components/errors/AxiosError";
import LoanProcessing from "./features/processing/LoanProcessing";
import ApplicationStatus from "./features/application/ApplicationStatus";

function Personal() {
  const { status, isLoading, error } = usePersonal();

  if (isLoading) return <FullLoader />;
  if (error) return <AxiosError error={error} />;

  switch (status?.status) {
    case 0:
      return <ApplicationStatus />;
    case 1:
      return <LoanProcessing />;
    // case 2:
    // return <Repayment />;
  }
}

export default Personal;