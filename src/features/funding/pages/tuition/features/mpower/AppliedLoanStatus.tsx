import ContentComponent from "../../../../../../components/ContentComponent";
import useTuition from "../../services/useTuition";

function AppliedLoanStatus() {
  const { mpowerStatus } = useTuition();
  const leadSchool = mpowerStatus?.lead?.opportunities[0];

  return (
    <ContentComponent header="Mpower Loan Status">
      <p>
        Mpower application has been submited to mpower. Status updates will be
        sent here
      </p>
      <div className="col p-3">
        <p>Loan Eligibility Status : {leadSchool?.eligibilityStatus}</p>
        <p>Loan Progress : {leadSchool?.borrowerStepProgress}</p>
      </div>
    </ContentComponent>
  );
}

export default AppliedLoanStatus;
