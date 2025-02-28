import { useState } from "react";
import useVisa from "../../services/hooks/useVisa";
import VisaPaymentModal from "./VisaPaymentModal";
import Expedite from "../../features/expedite/Expedite";
import VisaTrainingStatus from "../../features/visa-training-resources/VisaTrainingStatus";
import { Link } from "react-router-dom";

function VisaPaymentStatus() {
  const [open, setOpen] = useState(false);
  const { visaPayments } = useVisa();
  const status = visaPayments?.status || 0; //for testing
  const ModalBtn = () => (
    <>
      <button className="primary-btn self-end" onClick={() => setOpen(!open)}>
        Request Visa Payment
      </button>
      <VisaPaymentModal open={open} toggleModal={() => setOpen(!open)} />
    </>
  );
  switch (status) {
    case 1:
      return (
        <div className="my-5">
          <h3 className="title-sm">Visa Payment Request</h3>
          <div className="card col p-4 ">
            <p>
              Your request for visa fees payment has been submitted successfully
            </p>
            <p>Kindly be patient as our team reviews your request</p>
            <p className="">
              For any inquiries, please <strong>create a ticket</strong> to
              contact support.
            </p>
            <Link
              to="/create-ticket"
              className="primary-border-btn my-2 self-end"
            >
              Create Ticket
            </Link>
          </div>
        </div>
      );
    case 2:
      return (
        <section>
          <div>
            <p className="my-2 p-3">
              Your visa fee payment has been approved and disbursed to you. You
              may now submit it to the embassy and schedule a visa interview
              date. You have also been granted access to visa expedite letter
              (if you need it). To access the visa training resources, please
              submit the request using the button below.
            </p>
          </div>
          <VisaTrainingStatus />
          <Expedite />
        </section>
      );
    case 3:
      return (
        <div className="my-5">
          <h3 className="title-sm">Visa Payment Request</h3>
          <div className="card col p-3">
            <p className="alert alert-danger mt-2">
              Your request for visa fees payment has been{" "}
              <strong>declined</strong> . Please check the comment below from
              the reviewer, rectify and resubmit.
            </p>
            <p>Reviewer's Comment:{visaPayments["reason_denied"]}</p>
            <ModalBtn />
          </div>
        </div>
      );
    default:
      return (
        <div className="card col gap-2 p-4 my-5">
          <h3 className="title-sm">Request Visa Fee Payment</h3>
          <p>Please submit a request to have your visa fees paid.</p>
          <ModalBtn />
        </div>
      );
  }
}

export default VisaPaymentStatus;
