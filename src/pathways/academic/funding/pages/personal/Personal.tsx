// pages/personal/Personal.tsx
import AxiosError from "../../../../../components/errors/AxiosError";
import { FullLoader } from "../../../../../components/loaders/Loader";
import ApplicationStatus from "./features/application/ApplicationStatus";
import usePersonal from "./services/usePersonal";
import LoanProcessing from "./features/processing/LoanProcessing";
import Repayments from "./features/repayment/Repayments";

function Personal() {
  // pull bankComplete so we can gate status 4 properly
  const { personalLoan, bankComplete, isLoading, error } = usePersonal();

  if (isLoading) return <FullLoader />;
  if (error) return <AxiosError error={error} />;

  // Normalize route stage directly from backend personal_loan.status
  // 0 -> no row => Application
  // 1 -> status === 1 => LoanProcessing
  // 4 -> status === 4 AND bankComplete => Repayments
  // else -> LoanProcessing
  const raw = Number(personalLoan?.status);
  const stage: 0 | 1 | 2 | 4 =
    !personalLoan
      ? 0
      : raw === 1
      ? 1
      : raw === 4
      ? (bankComplete ? 4 : 2) // <-- require bank details complete before Repayments
      : 2;

  switch (stage) {
    case 0:
      return <ApplicationStatus />;
    case 1:
    case 2:
      return <LoanProcessing />;
    case 4:
      return <Repayments />;
    default:
      return <ApplicationStatus />;
  }
}

export default Personal;
