import useFunding from "../../services/useFunding";
import CreditReview from "./features/credit-review/CreditReview";
import FundingAdvisory from "./features/funding-advisory/FundingAdvisory";
import Mpower from "./features/mpower/Mpower";

function Tuition() {
  const { status, stage } = useFunding();

  switch (stage) {
    case 1:
      return <CreditReview />;
    case 2:
      return <FundingAdvisory />;
    case 3:
      return <Mpower />;
    default:
      return null;
  }
}

export default Tuition;
