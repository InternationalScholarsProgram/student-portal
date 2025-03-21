import SchoolHeader from "../../components/SchoolHeader";
import useTuition from "../../services/useTuition";
import Mpower from "./mpower/Mpower";
import SallieMae from "./sallie-mae/SallieMae";

function LoanApplication() {
  const { activeLoanApplication } = useTuition();
  if (!activeLoanApplication) return <>An error occured</>;

  return (
    <div className="">
      <SchoolHeader
        schoolName={activeLoanApplication?.school}
        program={activeLoanApplication?.program}
      />
      <div className="h-2" />
      {activeLoanApplication?.funding === "MPOWER" ? <Mpower /> : <SallieMae />}
    </div>
  );
}

export default LoanApplication;
