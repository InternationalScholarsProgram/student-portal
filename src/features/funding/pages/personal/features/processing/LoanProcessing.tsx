import AcceptedLoan from "../../../../components/AcceptedLoan";
import BankDetails from "../../../../components/BankDetails";
import YourRejectedLoan from "../../../../components/YourRejectedLoan";
import usePersonal from "../../services/usePersonal";
import Decision from "./Decision";
import PersonalLoanContract from "./PersonalLoanContract";

const LoanProcessing = () => {
  const { personalLoan } = usePersonal();

  switch (personalLoan?.status) {
    case 1:
      return <Decision />;
    case 2:
      return (
        <AcceptedLoan>
          <PersonalLoanContract />
        </AcceptedLoan>
      );
    case 3:
      return <YourRejectedLoan toPay={personalLoan?.to_pay} />;
    case 4:
      return <BankDetails />;
  }
};

export default LoanProcessing;
