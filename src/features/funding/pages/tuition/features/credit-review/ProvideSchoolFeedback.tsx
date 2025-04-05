import ContentComponent from "../../../../../../components/ContentComponent";
import { Link } from "react-router-dom";

function ProvideSchoolFeedback() {
  return (
    <ContentComponent header="Provide School Feedback">
      <p>Before proceeding with this module, you must:</p>
      <ul className="list-disc px-2 list-inside">
        <li>Ensure you have received an admission letter from the school.</li>
        <li>
          Upload the admission letter under the{" "}
          <strong>School Admission</strong> module.
        </li>
        <li>
          Wait for admin approval of your admission letter before moving
          forward.
        </li>
      </ul>
      <p>
        Once approved, you can request a loan to cover your tuition and living
        expenses.
      </p>
      <p>Please ensure that all required details are accurate and complete.</p>
      <p>
        If you have any questions or concerns, please contact our support team.
      </p>
      <div className="row justify-end gap-2">
        <Link to={"/create-ticket"} className="text-btn">
          Contact Support
        </Link>
        <Link to={"/school-admission-application"} className="primary-btn">
          Provide Feedback
        </Link>
      </div>
    </ContentComponent>
  );
}

export default ProvideSchoolFeedback;
