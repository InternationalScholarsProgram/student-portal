import { useMemo } from "react";
import ContactSupport from "../../../../../../../components/ContactSupport";
import ContentComponent from "../../../../../../../components/ContentComponent";
import ApplicationForm from "../../../../components/ApplicationForm";
import useAlternative from "../../services/useAlternative";

const ApplicationStatus: React.FC = () => {
  const { user_details, invalidate } = useAlternative();

  const form = useMemo(
    () => (
      <ContentComponent header="Alternative Loan Application Form" className="my-3">
        <ApplicationForm max={5000} loanType={3} onSuccess={() => invalidate("status")} />
      </ContentComponent>
    ),
    [invalidate]
  );

  const status = Number(user_details?.status);

  switch (status) {
    case 1:
      return (
        <ContentComponent header="Alternative Loan Application Under Review">
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
              <span className="text-error-main px-2 font-semibold">rejected</span>{" "}
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
          {form}
        </>
      );

    case 3:
      return <p>Loan approved</p>;

    default:
      return (
        <>
          <p>
            Please submit your alternative loan application by filling the form below
          </p>
          {form}
        </>
      );
  }
};

export default ApplicationStatus;

/*
2 or 5 - viewing loan (handled elsewhere by the page-level switch using the top-level "status")
3 - loan approved
7 - rejected
*/
