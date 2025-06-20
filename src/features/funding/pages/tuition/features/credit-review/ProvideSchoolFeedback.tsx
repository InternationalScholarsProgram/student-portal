import { Link } from "react-router-dom";
import ContentComponent from "../../../../../../components/ContentComponent";

function ProvideSchoolFeedback() {
  return (
    <ContentComponent header="Provide School Feedback">
      <p>
        Before you proceed with this module, you must complete the following
        steps:
      </p>
      <ul className="list-disc px-2 list-inside">
        <li>
          <b>Receive an Admission Letter .</b>
          <br />
          Ensure that you have received your official admission letter from the
          school
        </li>
        <li>
          <b>Upload the admission letter </b>. <br />
          Upload the admission letter under the{" "}
          <strong>School Admission</strong> module.
        </li>
        <li>
          <b>Await Admin Approval</b> <br />
          Wait for administrative approval of your uploaded admission letter
          before moving forward
        </li>
      </ul>
      <p>
        Once your admission letter has been approved by our team, you may
        proceed to request a loan to cover your tuition and living expenses
      </p>
      <p>
        Please ensure that all submitted details are accurate and complete to
        avoid any delays in processing.
      </p>
      <p>
        If you have any questions or concerns, please do not hesitate to contact
        our support team for assistance.
      </p>
      <div className="row justify-end gap-2">
        <Link to={"/create-ticket"} className="text-btn">
          Contact Support
        </Link>
        <Link to={"/school-admission/application"} className="primary-btn">
          Provide Feedback
        </Link>
      </div>
    </ContentComponent>
  );
}

export default ProvideSchoolFeedback;