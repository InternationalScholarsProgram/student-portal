import useTuition from "../../services/useTuition";
import Mpower from "./mpower/Mpower";
import SallieMae from "./sallie-mae/SallieMae";

function LoanApplication() {
  const { loanType } = useTuition();
  return (
    <div>
      {/* <Mpower />  */}
       <SallieMae />
    </div>
  );
}

export default LoanApplication;
