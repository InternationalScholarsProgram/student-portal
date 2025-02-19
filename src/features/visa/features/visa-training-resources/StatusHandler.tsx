import { useState } from "react";
import RequestModal from "./RequestModal";
import { Link } from "react-router-dom";
import useVisa from "../../services/hooks/useVisa";
import Training from "./Training";

function StatusHandler() {
  const { visa } = useVisa();

  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <section className="card p-3 my-5">
      {!visa?.status && (
        <div className="col gap-2">
          <h3>Request Visa training resources ?</h3>
          <p>
            Use the link below to request Visa training videos to help you
            prepare for the interview.
          </p>
          <div className="row justify-end gap-2">
            <button
              className="primary-btn "
              onClick={toggleModal}
              type="button"
            >
              Request Visa Training Resources
            </button>
          </div>
        </div>
      )}
      {visa?.status === 1 && (
        <div className="col gap-3">
          <h3 className="title-sm">Training Resources</h3>
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
            We appreciate your patience and are committed to helping you succeed
            in your visa interview.
          </p>
          <div className="row justify-end gap-2">
            <Link to="/create-ticket" className="primary-btn" type="button">
              Create Ticket
            </Link>
          </div>
        </div>
      )}
      {(visa?.status === 2 || visa?.status === 9) && <Training />}
      {visa?.status === 3 && (
        <div>
          Rejected
          <p>{visa?.remark}</p>
        </div>
      )}

      <RequestModal open={open} toggleModal={toggleModal} />
    </section>
  );
}

export default StatusHandler;
