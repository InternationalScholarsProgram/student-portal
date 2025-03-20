import React from "react";
import LoanDesicionFeedback from "./LoanDesicionFeedback";
import Mpower from "../mpower/Mpower";
import SallieMae from "../sallie-mae/SallieMae";
import useTuition from "../../../services/useTuition";

const LoanStatus: React.FC<{ status: number }> = ({ status }) => {
  const { activeLoanApplication } = useTuition();
//   return (
//     <LoanDesicionFeedback
//       amount={34234}
//       lender={activeLoanApplication?.funding}
//       schoolDetails={`${activeLoanApplication?.school} - ${activeLoanApplication?.program}`}
//     />
//   );
  switch (status) {
    case 7:
    case 8:
    case 9:
      return activeLoanApplication?.funding === "MPOWER" ? (
        <Mpower />
      ) : (
        <SallieMae />
      );
    case 11:
      return <LoanDesicionFeedback amount={34234} lender="" schoolDetails="" />;
    default:
      return <div>LoanStatus</div>;
  }
};

export default LoanStatus;
