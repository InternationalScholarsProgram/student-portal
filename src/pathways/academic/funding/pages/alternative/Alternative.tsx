import AxiosError from "../../../../../components/errors/AxiosError";
import { FullLoader } from "../../../../../components/loaders/Loader";
import ApplicationStatus from "./features/application/ApplicationStatus";
import LoanProcessing from "./features/processing/LoanProcessing";
import Repayment from "./features/repayment/Repayment";
import useAlternative from "./services/useAlternative";

function Alternative() {
  const { alternativeStatus, isLoading, error } = useAlternative();

  if (isLoading) return <FullLoader />;
  if (error) return <AxiosError error={error} />;
  // return <LoanProcessing />;

  switch (alternativeStatus?.status) {
    case 0:
      return <ApplicationStatus />;
    case 1:
      return <LoanProcessing />;
    case 2:
      return <Repayment />;
    default:
      return null;
  }
}

export default Alternative;
