import useTuition from "../../../services/useTuition";
import MpowerLoanForm from "./MpowerLoanForm";
import LoanLenderStatus from "../components/LoanLenderStatus";
import LeadStatus from "./LeadStatus";

function Mpower() {
  const { activeLoanApplication } = useTuition();
  const loanStatus = activeLoanApplication?.application_details?.status || 0;
  if (!activeLoanApplication?.application_requested) return <MpowerLoanForm />;
  if (loanStatus === 4) return <LeadStatus />;
  
  return (
    <LoanLenderStatus
      // loanStatus={3}
      loanStatus={loanStatus}
      loanProvider="Mpower"
      loanForm={<MpowerLoanForm />}
      remarks={activeLoanApplication?.application_details?.remark || ""}
    />
  );
}

export default Mpower;