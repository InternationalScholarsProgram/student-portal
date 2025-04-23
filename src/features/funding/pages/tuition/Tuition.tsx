import { FullLoader } from "../../../../components/loaders/Loader";
import useTuition from "./services/useTuition";
import CreditReview from "./features/credit-review/CreditReview";
import LoanApplication from "./features/loan-application/LoanApplication";
import FundingAdvisory from "./features/funding-advisory/FundingAdvisory";
import OtherFundingSources from "./components/OtherFundingSources";
import ProvideSchoolFeedback from "./features/credit-review/ProvideSchoolFeedback";
import AxiosError from "../../../../components/errors/AxiosError";

function Tuition() {
  const { tuitionStatus, isLoading, isError, error } = useTuition();

  if (isLoading) return <FullLoader />;
  if (isError)
    return (
      <p>
        Something went wrong : <AxiosError error={error} />
      </p>
    );

  // return <ProvideSchoolFeedback />;
  // return <CreditReview />;
  // return <FundingAdvisory />;
  // return <OtherFundingSources />;
  // return <LoanApplication />;

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
  }
}

export default Tuition;
