import useRelocation from "../../services/useRelocation";
import Decision from "./Decision";
import AcceptedLoan from "./AcceptedLoan";
import YourRejectedLoan from "./YourRejectedLoan";
import BankDetails from "./BankDetails";

const LoanProcessing = () => {
  const { loan } = useRelocation();

  switch (loan?.status) {
    case 1:
      return <Decision />;
    case 2:
      return <AcceptedLoan />;
    case 3:
      return <YourRejectedLoan toPay={loan?.to_pay} />;
    case 4:
      return <BankDetails />;
  }
};

export default LoanProcessing;
