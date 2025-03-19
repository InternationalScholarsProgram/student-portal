import { FullLoader } from "../../../../components/loaders/Loader";
import { lazy } from "react";
import useTuition from "./services/useTuition";
import SelectSchool from "./components/SelectSchool";
import CreditReview from "./features/credit-review/CreditReview";
import LoanApplication from "./features/loan-application/LoanApplication";
import FundingAdvisory from "./features/funding-advisory/FundingAdvisory";
import OtherFundingSources from "./components/OtherFundingSources";

// Lazy load components
// const OtherFundingSources = lazy(
//   () => import("./components/OtherFundingSources")
// );
// const CreditReview = lazy(
//   () => import("./features/credit-review/CreditReview")
// );
// const FundingAdvisory = lazy(
//   () => import("./features/funding-advisory/FundingAdvisory")
// );
// const LoanApplication = lazy(
//   () => import("./features/loan-application/LoanApplication")
// );

function Tuition() {
  const { tuitionStatus, isLoading } = useTuition();

  if (isLoading || !tuitionStatus) return <FullLoader />;

  return <OtherFundingSources />;
  return <LoanApplication />;
  return <CreditReview />;
  return <FundingAdvisory />;
  switch (tuitionStatus) {
    case 0:
    case 1:
    case 3:
      return <CreditReview />;
    case 2:
    case 4:
    case 5:
      return <FundingAdvisory />;
    case 6:
      return (
        <>
          <OtherFundingSources />
          <SelectSchool />
        </>
      );
    case 7:
      return <LoanApplication />;
  }
}

export default Tuition;
