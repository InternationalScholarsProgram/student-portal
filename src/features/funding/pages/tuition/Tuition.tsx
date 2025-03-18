import CreditReview from "./features/credit-review/CreditReview";
import FundingAdvisory from "./features/funding-advisory/FundingAdvisory";
import Mpower from "./features/mpower/Mpower";
import useTuition from "./services/useTuition";

function Tuition() {
  const { tuitionStatus } = useTuition();
  // return <Mpower />
  switch (tuitionStatus) {
    case 1:
    case 2:
    case 3:
      return <CreditReview />;

    case 4:
    case 5:
      return <FundingAdvisory />;

    case 6:
      return <CreditReview />;

    case 7:
      return <CreditReview />;

    default:
      break;
  }
}

export default Tuition;
