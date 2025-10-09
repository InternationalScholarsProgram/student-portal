import { useMemo } from "react";
import ContactSupport from "../../../../../../../components/ContactSupport";
import ContentComponent from "../../../../../../../components/ContentComponent";
import ApplicationForm from "../../../../components/ApplicationForm";
import useAlternative from "../../services/useAlternative";

const ApplicationStatus: React.FC = () => {
  // Pull the derived/passthrough status from the hook
  const { status, user_details, invalidate, isLoading, error } = useAlternative();

  // Optional: small guard for loading/error to avoid brief flickers
  if (isLoading) {
    return (
      <ContentComponent header="Alternative Loan">
        <p>Loading your application status…</p>
      </ContentComponent>
    );
  }
  if (error) {
    return (
      <ContentComponent header="Alternative Loan">
        <p className="text-error-main">We couldn’t load your status. Please try again.</p>
        <ContactSupport />
      </ContentComponent>
    );
  }

  const form = useMemo(
    () => (
      <ContentComponent header="Alternative Loan Application Form" className="my-3">
        <ApplicationForm
          max={5000}
          loanType={3}                           // 3 = Alternative (Study)
          onSuccess={() => invalidate("status")} // refetch after submit
        />
      </ContentComponent>
    ),
    [invalidate]
  );

  // Use the authoritative/derived status from the hook
  const s = Number(status);

  switch (s) {
    // Treat these as "under review / processing"
    case 1:
    case 2:
    case 5:
      return (
        <ContentComponent header="Alternative Loan Application Under Review">
          <p>
            Your loan request has been received and is{" "}
            <span className="text-dark-warning-main">being processed.</span>
          </p>
          <ContactSupport />
        </ContentComponent>
      );

    // Rejected -> show reason + form
    case 7:
      return (
        <>
          <div className="col gap-2">
            <p>
              Your loan application has been
              <span className="text-error-main px-2 font-semibold">rejected</span>{" "}
              by our team.
            </p>
            <p className="px-3">
              <b>Reason:</b>{" "}
              <em>{user_details?.remark || "No specific reason was provided."}</em>
            </p>
            <p>
              Please review the feedback above and resubmit the form after making the
              necessary corrections.
            </p>
          </div>
          {form}
        </>
      );

    // Approved (some backends use 3, others 4)
    case 3:
    case 4:
      return <p>Loan approved</p>;

    // Default: new applicant or unknown -> show the form
    default:
      return (
        <>
          <p>Please submit your alternative loan application by filling the form below</p>
          {form}
        </>
      );
  }
};

export default ApplicationStatus;

/*
Statuses:
1/2/5 - under review
3/4   - approved
7     - rejected (show reason + form)
default - show the application form (new/unknown)
*/
