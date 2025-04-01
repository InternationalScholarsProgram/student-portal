import ContentComponent from "../../../../../../components/ContentComponent";
import SchoolHeader from "../../components/SchoolHeader";
import { useSubsequentMeeting } from "../subsequent-meeting/useSubsequentMeeting";
import useTuition from "../../services/useTuition";
import SubsequentMeeting from "../subsequent-meeting/SubsequentMeeting";
import FeedbackStatus from "./feedback/FeedbackStatus";
import LoanDesicionFeedback from "./feedback/LoanDesicionFeedback";
import Mpower from "./mpower/Mpower";
import SallieMae from "./sallie-mae/SallieMae";
import BookSubsequent from "../subsequent-meeting/BookSubsequent";

function LoanApplication() {
  const { activeLoanApplication } = useTuition();
  const { subsequentMeeting } = useSubsequentMeeting();

  if (!activeLoanApplication)
    return !subsequentMeeting?.status ? (
      <SubsequentMeeting />
    ) : (
      <ContentComponent header="Loan Application Status">
        <p>
          You have not been matched with a lender yet. Please schedule a funding
          advisory meeting to explore available loan options and take the next
          step in your application process.
        </p>
        <BookSubsequent rejected />
      </ContentComponent>
    );

  function getRightComponent() {
    if (activeLoanApplication?.loan_app_feedback?.status)
      return <FeedbackStatus />;

    const loanStatus = activeLoanApplication?.application_details?.status;
    if (loanStatus === 6) return <LoanDesicionFeedback />;

    return renderFundingComponent(activeLoanApplication?.funding);
  }

  return (
    <LoanWrapper school={activeLoanApplication}>
      {getRightComponent()}
    </LoanWrapper>
  );
}

export default LoanApplication;

const LoanWrapper = ({ children, school }: any) => (
  <div className="col gap-2">
    <SchoolHeader schoolName={school?.school} program={school?.program} />
    <SubsequentMeeting />
    <div className="h-2" />
    {children}
  </div>
);
const renderFundingComponent = (funding: string) => {
  switch (funding) {
    case "MPOWER":
      return <Mpower />;
    case "Sallie":
      return <SallieMae />;
    default:
      return <p>Funding provider not found</p>;
  }
};
