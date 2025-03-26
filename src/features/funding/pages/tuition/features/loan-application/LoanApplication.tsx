import SchoolHeader from "../../components/SchoolHeader";
import useTuition from "../../services/useTuition";
import SubsequentMeeting from "../funding-advisory/SubsequentMeeting";
import LoanDesicionFeedback from "./components/LoanDesicionFeedback";
import Mpower from "./mpower/Mpower";
import SallieMae from "./sallie-mae/SallieMae";

function LoanApplication() {
  const { activeLoanApplication } = useTuition();

  const loanDetails = activeLoanApplication?.application_details;
  const funding = activeLoanApplication?.funding;

  if (!activeLoanApplication) return <>An error occured</>;
  if (loanDetails?.status === 6)
    return (
      <LoanWrapper
        school={activeLoanApplication}
        children={<LoanDesicionFeedback />}
      />
    );
  return (
    <LoanWrapper school={activeLoanApplication}>
      {funding === "MPOWER" && <Mpower />}
      {funding === "Sallie" && <SallieMae />}
    </LoanWrapper>
  );
}

export default LoanApplication;

const LoanWrapper = ({ children, school }: any) => (
  <div className="col gap-2">
    <SubsequentMeeting />
    <SchoolHeader schoolName={school?.school} program={school?.program} />
    <div className="h-2" />
    {children}
  </div>
);
