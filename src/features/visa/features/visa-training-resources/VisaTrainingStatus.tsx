import { useState } from "react";
import RequestModal from "./RequestModal";
import { Link } from "react-router-dom";
import useVisa from "../../services/hooks/useVisa";
import VisaTraining from "./VisaTraining";

function VisaTrainingStatus() {
  const { visa } = useVisa();
  const status = visa?.status;
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <>
      {status !== 2 && (
        <h3 className="title-sm py-2">Visa training resources</h3>
      )}

      {/* Content */}
      {status === 2 || status === 9 || status === 4 ? (
        <VisaTraining />
      ) : (
        <section className="card p-3 my-2">
          {!status && (
            <div className="col gap-2">
              <h3>Need Visa Training Resources for Your Interview?</h3>
              <p>
                Access our comprehensive Visa training materials, including
                step-by-step video guides, expert tips, and common interview
                questions to boost your confidence.
              </p>
              <p>
                Click the button below to request access to our exclusive Visa
                training videos and ensure you're fully prepared for your
                upcoming interview.
              </p>
              <button className="primary-btn self-end" onClick={toggleModal}>
                Request Visa Training Resources
              </button>
            </div>
          )}
          {status === 1 && (
            <div className="col gap-3">
              <p>
                Your request to access Visa interview training resources is
                currently under<b> review </b>by our team. We are processing all
                requests as quickly as possible to ensure that you receive the
                necessary materials to prepare for your interview.
              </p>
              <p>
                Kindly be patient as our team works on it. You will receive an
                update via email or through your dashboard once your request has
                been approved. If you have any urgent concerns or need further
                assistance, please feel free to reach out to our support team.
              </p>
              <p>
                We appreciate your patience and are committed to helping you
                succeed in your visa interview.
              </p>
              <Link
                to="/create-ticket"
                className="primary-btn self-end"
                type="button"
              >
                Create Ticket
              </Link>
            </div>
          )}

          {status === 3 && (
            <div className="col gap-2">
              <h4 className="font-semibold">Request Rejected</h4>
              <p>
                Unfortunately, your request has been rejected. Please review the
                remark below for further details.
              </p>
              <p className="">
                Reason: {visa?.remark || "No specific reason provided."}
              </p>
              <p>
                If you believe this was a mistake or if corrections are needed,
                you may resubmit your application with the required updates.
              </p>
              <button className="primary-btn self-end" onClick={toggleModal}>
                Resubmit
              </button>
            </div>
          )}
        </section>
      )}
      <RequestModal open={open} toggleModal={toggleModal} />
    </>
  );
}

export default VisaTrainingStatus;
