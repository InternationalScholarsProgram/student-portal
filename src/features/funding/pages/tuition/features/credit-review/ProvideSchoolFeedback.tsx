import ContentComponent from "../../../../../../components/ContentComponent";
import { Link } from "react-router-dom";

function ProvideSchoolFeedback() {
  return (
    <ContentComponent header="Provide School Feedback">
      <p>
        Before proceeding with this module, you must first provide school
        feedback. Your school should have issued you an admission letter, which
        must be uploaded under the School Admission module. Once completed, you
        can proceed with requesting a loan to cover your tuition and living
        expenses.
      </p>
      <p>Please ensure that all required details are provided.</p>
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
