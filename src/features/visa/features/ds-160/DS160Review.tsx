import useVisa from "../../services/hooks/useVisa";
import VisaPaymentStatus from "../../components/payments/VisaPaymentStatus";
import { FullLoader } from "../../../../components/loaders/Loader";
import DS160RequestModal from "./DS160RequestModal";
import { useState } from "react";
import ContentComponent from "../../../../components/ContentComponent";
import { Link } from "react-router-dom";

function DS160Review() {
  const [open, setOpen] = useState(false);
  const { ds160Review } = useVisa();

  if (!ds160Review) return <FullLoader />;
  const { reviewed, declined, comment } = ds160Review;
  if (reviewed === 0)
    return (
      <ContentComponent className="my-2" header="DS-160 Review Request">
        <p>
          Your DS-160 review request has been successfully submitted and is
          currently under review.
        </p>
        <p>
          Our team is carefully evaluating your submission. Please be patient,
          and check back regularly for updates.
        </p>
        <p>
          If you have any urgent concerns, feel free to reach out by creating a
          support ticket.
        </p>
        <Link className="primary-btn self-end" to="/create-ticket">
          Create Ticket
        </Link>
      </ContentComponent>
    );

  return (
    <div>
      {declined === 0 ? (
        <VisaPaymentStatus />
      ) : (
        <ContentComponent className="my-2" header="DS-160 Review Request">
          <p>
            Sorry, your DS-160 review request was not approved. Please check the
            comment below, fix the issue, and resubmit.
          </p>
          <p className="">
            <strong>Reviewer's Comment: </strong>
            <em> {comment}</em>
          </p>
          <button
            className="primary-btn self-end"
            onClick={() => setOpen(!open)}
          >
            Resubmit
          </button>
          <DS160RequestModal open={open} toggleModal={() => setOpen(false)} />
        </ContentComponent>
      )}
    </div>
  );
}

export default DS160Review;
