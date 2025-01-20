import { Link } from "react-router-dom";
import SchoolFeedBackModal from "./SchoolFeedBackModal";
import { useState } from "react";

function FeedBackStatus({ school }: any) {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const feedback = school?.application_details?.feedback;
  const feedbackCode = feedback?.feedback?.toString();
  const status = feedback?.status?.toString();

  const ongoingloan = status === "2";

  // Handle conditions in a switch block
  switch (true) {
    case ongoingloan &&
      feedbackCode === "1" &&
      (status === "1" || status === "14"):
      return (
        <>
          <p>
            Your loan application request was approved by our team. Please
            proceed to the funding module on this portal to submit all the
            required details.
          </p>
          <Link
            to="/funding"
            className="text-primary-light underline self-end py-2"
          >
            Go to Funding
          </Link>
        </>
      );

    case feedbackCode === "2":
      return (
        <p>
          We are sorry that you were not accepted. You can still submit a career
          advisory request to select other schools.
        </p>
      );

    case status === "0":
      return <p>Your school admission decision is being reviewed.</p>;

    case status === "11":
      return (
        <>
          <p>
            Your school admission feedback was approved. Please proceed to the
            funding module to submit your request for tuition and living
            expenses funding application.
          </p>
          <Link
            to="/funding"
            className="text-primary-light underline self-end py-2"
          >
            Go to Funding
          </Link>
        </>
      );

    case status === "13":
      return (
        <p>
          <i className="fas fa-spinner"></i> Your funding application request is
          being reviewed.
        </p>
      );

    case status === "12":
      return (
        <div className="col gap-2">
          <p>
            <i className="fas fa-times"></i> Your school admission decision
            feedback has been <span className="text-error-main">rejected</span>{" "}
            by our team.
          </p>
          <p>
            Please check the comment below, work on the reason and resubmit.
          </p>
          <p>
            <strong>Reason:</strong>
            <em>
              <strong>{feedback.remark}</strong>
            </em>
          </p>
          <button onClick={toggleModal} className="primary-btn self-end">
            Resubmit School Admission Decision
          </button>
          <SchoolFeedBackModal
            open={open}
            toggleModal={toggleModal}
            school={school}
          />
        </div>
      );

    default:
      return null; // Fallback case when no condition matches
  }
}

export default FeedBackStatus;
