import { useEffect } from "react";
import { FullLoader } from "../../../../../components/loaders/Loader";
import useTuition from "./services/useTuition";
import CreditReview from "./features/credit-review/CreditReview";
import LoanApplication from "./features/loan-application/LoanApplication";
import FundingAdvisory from "./features/funding-advisory/FundingAdvisory";
import OtherFundingSources from "./components/OtherFundingSources";
import ProvideSchoolFeedback from "./features/credit-review/ProvideSchoolFeedback";
import AxiosError from "../../../../../components/errors/AxiosError";

function Tuition() {
  const {
    tuitionStatus,
    isLoading,
    isError,
    error,
    // optional extras for debugging:
    tuitionData,
    fundingAdvisory,
    activeLoanApplication,
  } = useTuition();

  // 🔎 Debug log: see current status and key context whenever they change
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.groupCollapsed("[Tuition] Debug");
    // eslint-disable-next-line no-console
    console.log("tuitionStatus ⇒", tuitionStatus);
    // eslint-disable-next-line no-console
    console.log("fundingAdvisory ⇒", fundingAdvisory);
    // eslint-disable-next-line no-console
    console.log("activeLoanApplication ⇒", activeLoanApplication);
    // eslint-disable-next-line no-console
    console.log("tuitionData ⇒", tuitionData);
    // eslint-disable-next-line no-console
    console.groupEnd();
  }, [tuitionStatus, fundingAdvisory, activeLoanApplication, tuitionData]);

  if (isLoading) return <FullLoader />;
  if (isError)
    return (
      <p>
        Something went wrong : <AxiosError error={error} />
      </p>
    );

  switch (tuitionStatus) {
    case 0:
      return <ProvideSchoolFeedback />;
    case 1:
    case 3:
      return <CreditReview />;
    case 2:
    case 4:
    case 5:
      return <FundingAdvisory />;
    case 6:
      return <OtherFundingSources />;
    case 7:
      return <LoanApplication />;
    default:
      // Fallback so the UI never renders nothing; also helps catch unexpected statuses.
      return <ProvideSchoolFeedback />;
  }
}

export default Tuition;
