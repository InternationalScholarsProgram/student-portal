import useTuition from "../../../services/useTuition";
import LoanLenderStatus from "../components/LoanLenderStatus";
import ProdigyLoanForm from "./ProdigyLoanForm";
import ProdigyStatus from "./ProdigyStatus";

function Prodigy() {
  const { activeLoanApplication } = useTuition();
  const loanStatus = activeLoanApplication?.application_details?.status || 0;

  
  if (!activeLoanApplication?.application_requested) return <ProdigyLoanForm />;

  
  if (loanStatus === 4) return <ProdigyStatus />;

  return (
    <LoanLenderStatus
      loanStatus={loanStatus}
      loanProvider="Prodigy"
      loanForm={<ProdigyLoanForm />}
      remarks={activeLoanApplication?.application_details?.remark || ""}
    />
  );
}

export default Prodigy;
