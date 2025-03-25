import SchoolHeader from "../../components/SchoolHeader";
import useTuition from "../../services/useTuition";
import SubsequentMeeting from "../funding-advisory/SubsequentMeeting";
import Mpower from "./mpower/Mpower";
import SallieMae from "./sallie-mae/SallieMae";

function LoanApplication() {
  const { activeLoanApplication } = useTuition();

  if (!activeLoanApplication) return <>An error occured</>;
  const funding = activeLoanApplication?.funding;
  return (
    <div className="col gap-2">
      <SubsequentMeeting />
      <SchoolHeader
        schoolName={activeLoanApplication?.school}
        program={activeLoanApplication?.program}
      />
      <div className="h-2" />
      {funding === "MPOWER" ? (
        <Mpower />
      ) : (
        funding === "Sallie" && <SallieMae />
      )}
    </div>
  );
}

export default LoanApplication;
