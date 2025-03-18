import useTuition from "../services/useTuition";
import Mpower from "../features/mpower/Mpower";
import SallieMae from "../features/sallie-mae/SallieMae";

function LoanApplication() {
  const { loanType } = useTuition();
  return (
    <div>
      {loanType === "mpower" ? <Mpower /> : <SallieMae />}
    </div>
  );
}

export default LoanApplication;
