import useRelocation from "../../services/useRelocation";
import Decision from "./Decision";
import AcceptedLoan from "./AcceptedLoan";
import YourRejectedLoan from "./YourRejectedLoan";

const LoanProcessing = () => {
  const { relocationStatus } = useRelocation();

  switch (relocationStatus?.loan?.status) {
    case 1:
      return <Decision />;
    case 2:
      return <AcceptedLoan />;
    case 3:
      return <YourRejectedLoan toPay={relocationStatus?.loan?.to_pay} />;
  }
};

export default LoanProcessing;
