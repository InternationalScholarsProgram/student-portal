import AxiosError from "../../../../../components/errors/AxiosError";
import { FullLoader } from "../../../../../components/loaders/Loader";
import ApplicationStatus from "./features/application/ApplicationStatus";
import LoanProcessing from "./features/processing/LoanProcessing";
import Repayment from "./features/repayment/Repayment";
import useAlternative from "./services/useAlternative";

function Alternative() {
  const { status, isLoading, error } = useAlternative();

  if (isLoading) return <FullLoader />;
  if (error) return <AxiosError error={error} />;
  switch (Number(status)) {
    case 0:
    case 1:
      return <ApplicationStatus />;
    case 2:
      return <LoanProcessing />;
    case 3:
      return <Repayment />; 
  }
}

export default Alternative;
