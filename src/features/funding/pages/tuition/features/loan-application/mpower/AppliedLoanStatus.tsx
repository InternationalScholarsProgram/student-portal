import ContentComponent from "../../../../../../../components/ContentComponent";
import useTuition from "../../../services/useTuition";

function AppliedLoanStatus() {
  const { mpowerStatus } = useTuition();
  console.log(mpowerStatus, "mpowerStatus");

  return (
    <ContentComponent header="Mpower Loan Status">
      <p>
        Mpower application has been submited to mpower. Status updates will be
        sent here
      </p>
      {mpowerStatus?.lead?.opportunities.map((school) => (
        <div className="col p-3">
          <p>School : {school?.schoolName}</p>
          <p>Loan Eligibility Status : {school?.eligibilityStatus}</p>
          <p>Loan Progress : {school?.borrowerStepProgress}</p>
        </div>
      ))}
    </ContentComponent>
  );
}

export default AppliedLoanStatus;
