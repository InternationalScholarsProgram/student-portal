import ContentComponent from "../../../../../../../components/ContentComponent";
import SchoolHeader from "../../components/SchoolHeader";
import useTuition from "../../services/useTuition";
import SubsequentMeeting from "../subsequent-meeting/SubsequentMeeting";
import FeedbackStatus from "./feedback/FeedbackStatus";
import LoanDesicionFeedback from "./feedback/LoanDesicionFeedback";
import Mpower from "./mpower/Mpower";
import SallieMae from "./sallie-mae/SallieMae";

function LoanApplication() {
  const { activeLoanApplication } = useTuition();

  if (!activeLoanApplication)
    return (
      <div className="col gap-3">
        <ContentComponent header="Loan Application Status">
          <p>You have not been matched with a lender yet.</p>
          <SubsequentMeeting />
        </ContentComponent>
      </div>
    );

  function getRightComponent() {
    if (activeLoanApplication?.loan_app_feedback?.status)
      return <FeedbackStatus />;

    const loanStatus = activeLoanApplication?.application_details?.status;
    if (loanStatus === 6) return <LoanDesicionFeedback />;

    return renderFundingComponent(activeLoanApplication?.funding);
  }

  return (
    <div className="col gap-2">
      <SchoolHeader
        loan={activeLoanApplication?.funding}
        schoolName={activeLoanApplication?.school}
        program={activeLoanApplication?.program}
      />
      <SubsequentMeeting />
      <div className="h-2" />
      {getRightComponent()}
    </div>
  );
}

export default LoanApplication;

const renderFundingComponent = (funding?: string) => {
  switch (funding) {
    case "MPOWER":
      return <Mpower />;
    case "Sallie":
      return <SallieMae />;
    default:
      return <p>Funding provider not found</p>;
  }
};
