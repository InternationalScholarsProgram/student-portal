import React from "react";
import useTuition from "../services/useTuition";
import SchoolHeader from "./SchoolHeader";
import useFunding from "../../../services/useFunding";
import Mpower from "../features/mpower/Mpower";
import SallieMae from "../features/sallie-mae/SallieMae";

function LoanApplication() {
  const { school } = useFunding();
  const { loanType } = useTuition();
  return (
    <div>
      {/* <SchoolHeader school={school} /> */}
      {loanType === "mpower" ? <Mpower /> : <SallieMae />}
    </div>
  );
}

export default LoanApplication;
