import ContactSupport from "../../../../../../../components/ContactSupport";
import ContentComponent from "../../../../../../../components/ContentComponent";
import { MpowerStatus } from "../../../../../types/fundingTypes";

const AppliedLoanStatus: React.FC<{ lead: MpowerStatus["lead"] }> = ({
  lead,
}) => {
  return (
    <ContentComponent header="Mpower Loan Status">
      <p>
        Mpower application has been submited to mpower. Status updates will be
        sent here
      </p>
      {lead?.opportunities.map((school, index) => (
        <div key={index} className="col p-3">
          <p>School : {school?.schoolName}</p>
          <p>Loan Eligibility Status : {school?.eligibilityStatus}</p>
          <p>Loan Progress : {school?.borrowerStepProgress}</p>
        </div>
      ))}
      <ContactSupport />
    </ContentComponent>
  );
};

export default AppliedLoanStatus;
