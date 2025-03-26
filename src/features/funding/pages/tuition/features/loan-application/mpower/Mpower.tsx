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
/* 
Status Code	Meaning	Badge Label	Description
1	New	badge-info	A freshly submitted application that hasn't been processed yet.
2 or 4	On Progress	badge-warning	The application is currently being worked on or under review.
3	Rejected	badge-danger	The application was reviewed but not approved.
10	Resubmitted (also "New")	badge-success + badge bg-warning	A previously rejected or returned application that has been submitted again.
completed= "SELECT * FROM `mpower_applicants` WHERE status NOT IN(1,2,3,4)"

switch (mpowerStatus?.status) {
  case 1:
  case 10:
    // case 6:
    return (
      <ContentComponent header="Mpower loan application status">
        <p>
          Your loan application has been received and is currently awaiting
          review by our team. You will be notified once it moves to the next
          stage.
        </p>
        <ContactSupport />
      </ContentComponent>
    );
  case 2:
    return (
      <ContentComponent header="Mpower loan application is in progress">
        <p>
          Your documents have been successfully verified, and your loan
          application is currently being processed. Please check back here for
          updates or further instructions.
        </p>
        <ContactSupport />
      </ContentComponent>
    );
  case 3: //total rejection
    return (
      <>
        <p>
          Unfortunately, your application has been <strong>rejected</strong>.
          Please review the reason provided below, resolve the issue, and
          submit a new application.
        </p>
        <p>
          <strong>Remarks:</strong>{" "}
          <em>{mpowerStatus?.application.remark}</em>
        </p>
        <p>When you're ready, please complete the form below to reapply.</p>
        <MpowerLoanForm />
      </>
    );
  case 9: //rejected only proof of address
    return (
      <>
        <p>
          Your application was <b>rejected</b> due to an issue with your proof of
          address. Please review the comment below and provide a valid
          physical address and supporting document to continue.
        </p>
        <p>
          <strong>Remarks:</strong>
          <em>{mpowerStatus?.application.remark}</em>
        </p>
        <p className="title-sm my-3">Resubmit your proof of address</p>
        <ContentComponent className="px-4" header="">
          <form className="col gap-2 px-4">
            <div className="alert my-3">
              <p className="">
                <strong>Note:</strong> Ensure you provide your permanent
                physical address. PO Box addresses are not accepted.
              </p>
            </div>
            <InputsWithLabel
              label="Proof of address"
              inputLabel="Building/Apartment/Suite/Land refrence number*"
              name="address"
            />

            <InputsWithLabel
              inputLabel="Proof of address"
              type="file"
              name="file"
            />
            <PrimaryBtn type="submit" className="self-end">
              Upload
            </PrimaryBtn>
          </form>
        </ContentComponent>
      </>
    );
}
*/
