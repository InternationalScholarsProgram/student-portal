import { Link } from "react-router-dom";
import SchoolFeedBackModal from "./SchoolFeedBackModal";
import { useState } from "react";

function FeedBackStatus({ school }: any) {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const feedback = school?.application_details?.feedback;
  const feedbackCode = feedback?.feedback?.toString();

  if (feedback?.status === "12")
    return (
      <div className="col gap-2">
        <p>
          <i className="fas fa-times"></i> Your school admission decision
          feedback has been <span className="text-error-main">rejected</span> by
          our team.
        </p>
        <p>Please check the comment below, work on the reason and resubmit.</p>
        <p>
          <strong>Reason:</strong>
          <em>{feedback.remark}</em>
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

  if (feedback?.status === "0") {
    return <p>Your feedback decision is being reviewed.</p>;
  } else {
    // Handle conditions in a switch block
    switch (feedbackCode) {
      case "1":
        return (
          <>
            <p>
              Your loan application request was approved by our team. Please
              proceed to the funding module on this portal to submit all the
              required details.
            </p>
            <Link
              to="/tuition"
              className="text-primary-light underline self-end py-2"
            >
              Go to Funding
            </Link>
          </>
        );
      case "2":
        return (
          <div className="col gap-2">
            <p>
              We are sorry that you were not accepted to{" "}
              {"University of Delaware (UDEL)"}. You can still submit a career
              advisory request to select other schools.
            </p>
          </div>
        );

      default:
        return <p>Not found</p>; // Fallback case when no condition matches
    }
  }
}

export default FeedBackStatus;
