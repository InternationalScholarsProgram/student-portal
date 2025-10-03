import AxiosError from "../../../../../components/errors/AxiosError";
import { FullLoader } from "../../../../../components/loaders/Loader";
import ApplicationStatus from "./features/application/ApplicationStatus";
import useRelocation from "./services/useRelocation";
import LoanProcessing from "./features/processing/LoanProcessing";
import Repayment from "./features/repayment/Repayment";

function Relocation() {
  const { relocationStatus, isLoading, error } = useRelocation();
  if (isLoading) return <FullLoader />;
  if (error) return <AxiosError error={error} />;
  // return <LoanProcessing />;

  switch (relocationStatus?.status) {
    case 0:
      return <ApplicationStatus />;
    case 1:
      return <LoanProcessing />;
    case 2:
      return <Repayment />;  
  }
}

export default Relocation;
