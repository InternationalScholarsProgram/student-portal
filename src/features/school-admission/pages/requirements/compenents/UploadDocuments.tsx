import { Link } from "react-router-dom";
import { RequirementsAccordion } from "./RequirementsTable";

function UploadDocuments({ canApply }: { canApply: boolean }) {
  return (
    <div className="col gap-2">
      <h3 className="title-sm text-primary-main">
        School Application Requirements
      </h3>
      <div className="sm:p-2">
        {canApply ? (
          <p>
            You have been approved to make an application
            <Link
              to="/school-admission/application"
              className="text-primary-light hover:border-b hover:border-primary-main pl-2"
            >
              Go to Application Page
            </Link>
          </p>
        ) : (
          <p className="opacity-70">
            You are currently <strong>not eligible</strong> to submit an
            application.
            <br /> To become eligible, please upload all the required documents
            listed below and wait for their approval.
          </p>
        )}

        <RequirementsAccordion />
      </div>
    </div>
  );
}

export default UploadDocuments;
