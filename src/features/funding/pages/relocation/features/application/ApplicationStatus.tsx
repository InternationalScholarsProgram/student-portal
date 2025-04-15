import ContactSupport from "../../../../../../components/ContactSupport";
import ContentComponent from "../../../../../../components/ContentComponent";
import useRelocation from "../../services/useRelocation";
import LoanForm from "./LoanForm";

const ApplicationStatus: React.FC = () => {
  const { application } = useRelocation();

  switch (application?.status) {
    case 2:
    case 5:
      return (
        <ContentComponent header="Relocation Loan Application Under Review">
          <p>
            Your loan request has been received and is{" "}
            <span className="text-dark-warning-main">being processed.</span>
          </p>
          <ContactSupport />
        </ContentComponent>
      );
    case 7:
      return (
        <>
          <div className="col gap-2">
            <p>
              Your loan application has been
              <span className="text-error-main px-2 font-semibold">
                rejected
              </span>{" "}
              by our team.
            </p>
            <p className="px-3">
              <b>Reason:</b>{" "}
              <em>
                {application?.remarks || "No specific reason was provided."}
              </em>
            </p>
            <p>
              Please review the feedback above and resubmit the form after
              making the necessary corrections.
            </p>
          </div>

          <ContentComponent header="Loan Application Form" className="my-3">
            <LoanForm />
          </ContentComponent>
        </>
      );
    case 3:
      return <p>Loan approved</p>;
    default:
      return (
        <>
          <p>
            Please submit your relocation loan application by filling the form
            below
          </p>
          <ContentComponent header="Loan Application Form" className="my-3">
            <LoanForm />
          </ContentComponent>
        </>
      );
  }
};

export default ApplicationStatus;
/*

2 or 5 - viewing loan
3 - loan approved and added to relocation loan
7 - rejecting loan :  "UPDATE `loan_application` SET `remark`='$remark', `status` = 7 WHERE `id` = '$id'");
*/
