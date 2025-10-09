import ContactSupport from "../../../../../../../components/ContactSupport";
import ContentComponent from "../../../../../../../components/ContentComponent";
import ApplicationForm from "../../../../components/ApplicationForm";
import usePersonal from "../../services/usePersonal";

const ApplicationStatus: React.FC = () => {
  // Single hook call (stable hooks order)
  const { user_details, invalidate } = usePersonal();

  // Read loans-table status (like relocation's `application?.status`)
  const raw = (user_details as any)?.status;
  const status =
    raw === null || raw === undefined || raw === "null" || raw === ""
      ? null
      : Number(raw);

  const onSuccess = () => invalidate("status");

  const renderForm = () => (
    <ContentComponent header="Personal Loan Application Form" className="my-3">
      <ApplicationForm max={5000} loanType={2} onSuccess={onSuccess} />
    </ContentComponent>
  );

  switch (status) {
    // Under review / being processed (mirror relocation's 2/5, add personal's 1)
    case 1:
    case 2:
    case 5:
      return (
        <ContentComponent header="Personal Loan Application Under Review">
          <p>
            Your loan request has been received and is{" "}
            <span className="text-dark-warning-main">being processed.</span>
          </p>
          <ContactSupport />
        </ContentComponent>
      );

    // Rejected (personal uses 7)
    case 3:
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
              <em>{user_details?.remark || "No specific reason was provided."}</em>
            </p>
            <p>
              Please review the feedback above and resubmit the form after
              making the necessary corrections.
            </p>
          </div>
          {renderForm()}
        </>
      );

    // Approved (mirror relocation's 4)
    case 4:
      return <p>Loan approved</p>;

    // Default → no loans row yet / unknown → show form
    default:
      return (
        <>
          <p>Please submit your personal loan application by filling the form below.</p>
          {renderForm()}
        </>
      );
  }
};

export default ApplicationStatus;

/*
Personal mapping (aligned to relocation structure):
- 1, 2, 5 -> Under Review / Processing
- 3       -> Rejected (+ form)
- 4       -> Approved
- default -> Show form
*/
