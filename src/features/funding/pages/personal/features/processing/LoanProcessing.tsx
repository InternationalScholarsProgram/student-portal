import AcceptedLoan from "../../../../components/AcceptedLoan";
import BankDetails from "../../../../components/BankDetails";
import LoanContract from "../../../../components/LoanContract";
import YourRejectedLoan from "../../../../components/YourRejectedLoan";
import usePersonal from "../../services/usePersonal";
import Decision from "./Decision";

const LoanProcessing = () => {
  const { personalLoan, invalidate, user_details, loanType } = usePersonal();

  switch (personalLoan?.status) {
    case 1:
      return <Decision />;
    case 2:
      return (
        <AcceptedLoan>
          <LoanContract
            onSuccess={() => invalidate("status")}
            application={user_details}
            loan={personalLoan}
            loanType={loanType}
          />
        </AcceptedLoan>
      );
    case 3:
      return <YourRejectedLoan toPay={personalLoan?.to_pay} />;
    case 4:
      return (
        <BankDetails
          loan={{
            member_no: personalLoan?.member_no,
            fullnames: personalLoan.fullnames,
            phone: personalLoan.phone,
            loan_id: personalLoan.loan_id,
            loanType: loanType,
          }}
          onSuccess={() => invalidate("status")}
        />
      );
  }
};

export default LoanProcessing;
