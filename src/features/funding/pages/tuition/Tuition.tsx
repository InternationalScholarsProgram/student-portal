import { FullLoader } from "../../../../components/loaders/Loader";
import useTuition from "./services/useTuition";
import SelectSchool from "./components/SelectSchool";
import CreditReview from "./features/credit-review/CreditReview";
import LoanApplication from "./features/loan-application/LoanApplication";
import FundingAdvisory from "./features/funding-advisory/FundingAdvisory";
import OtherFundingSources from "./components/OtherFundingSources";

function Tuition() {
  const { tuitionStatus, isLoading } = useTuition();

  if (isLoading || !tuitionStatus) return <FullLoader />;

  // return <CreditReview />;
  // return <OtherFundingSources />;
  // return <LoanApplication />;
  // return <FundingAdvisory />;

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
    default:
      return <LoanApplication />;
  }
}

export default Tuition;
