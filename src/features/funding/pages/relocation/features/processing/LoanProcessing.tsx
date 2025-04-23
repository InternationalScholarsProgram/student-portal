import useRelocation from "../../services/useRelocation";
import Decision from "./Decision";
import YourRejectedLoan from "../../../../components/YourRejectedLoan";
import BankDetails from "../../../../components/BankDetails";
import AcceptedLoan from "../../../../components/AcceptedLoan";
import RelocationContract from "./RelocationContract";

const LoanProcessing = () => {
  const { loan } = useRelocation();

  switch (loan?.status) {
    case 1:
      return <Decision />;
    case 2:
      return (
        <AcceptedLoan>
          <RelocationContract />
        </AcceptedLoan>
      );
    case 3:
      return <YourRejectedLoan toPay={loan?.to_pay} />;
    case 4:
      return <BankDetails />;
  }
};

export default LoanProcessing;
