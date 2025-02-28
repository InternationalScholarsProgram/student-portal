import useVisa from "../../services/hooks/useVisa";
import VisaPaymentStatus from "../../components/payments/VisaPaymentStatus";
import { FullLoader } from "../../../../components/loaders/Loader";
import DS160RequestModal from "./DS160RequestModal";
import { useState } from "react";

function DS160Review() {
  const [open, setOpen] = useState(false);
  const { ds160Review } = useVisa();

  if (!ds160Review) return <FullLoader />;
  const { reviewed, declined, comment } = ds160Review;
  if (reviewed === 0)
    return (
      <div>
        <p>Waiting for approval</p>
        <p>Your DS-160 review request was submitted successfully</p>
      </div>
    );

  return (
    <div>
      {declined === 0 ? (
        <VisaPaymentStatus />
      ) : (
        <div className="col my-2">
          <p className="title-sm">DS-160 review request</p>
          <div className="col card p-3">
            <p>
              Sorry, your DS-160 review request was not approved. Please check
              the comment below, fix the issue, and resubmit.
            </p>
            <p className="">
              <strong>
                <em>Reviewer's Comment: {comment}</em>
              </strong>
            </p>
            <button
              className="primary-btn self-end"
              onClick={() => setOpen(!open)}
            >
              Resubmit
            </button>
            <DS160RequestModal open={open} toggleModal={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DS160Review;
