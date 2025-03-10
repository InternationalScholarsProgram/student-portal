import { useCallback, useState } from "react";
import useVisa from "../../services/hooks/useVisa";
import VisaPaymentModal from "./VisaPaymentModal";
import Expedite from "../../features/expedite/Expedite";
import VisaTrainingStatus from "../../features/visa-training-resources/VisaTrainingStatus";
import { Link } from "react-router-dom";
import ContentComponent from "../../../../components/ContentComponent";

function VisaPaymentStatus() {
  const { visaPayments } = useVisa();
  const [open, setOpen] = useState(false);
  const ModalBtn = useCallback(
    () => (
      <>
        <button className="primary-btn self-end" onClick={() => setOpen(!open)}>
          Request Visa Payment
        </button>
        <VisaPaymentModal open={open} toggleModal={() => setOpen(!open)} />
      </>
    ),
    [open, setOpen]
  );
  const status = () => {
    switch (visaPayments?.status) {
      case 1:
        return (
          <ContentComponent header="Visa Payment Request">
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
          </ContentComponent>
        );
      case 2:
        return (
          <section className="col gap-5">
            <p className="mt-2 px-3">
              Your visa fee payment has been approved and disbursed to you. You
              may now submit it to the embassy and schedule a visa interview
              date. You have also been granted access to visa expedite letter
              (if you need it). To access the visa training resources, please
              submit the request using the button below.
            </p>
            <VisaTrainingStatus />
            <Expedite />
          </section>
        );
      case 3:
        return (
          <ContentComponent header="Visa Payment Request">
            <p className="">
              Your request for visa fees payment has been{" "}
              <strong>declined</strong> . Please check the comment below from
              the reviewer, rectify and resubmit.
            </p>
            <p>
              <strong>Reviewer's Comment:</strong>
              <em>{visaPayments?.reason_denied}</em>
            </p>
            <ModalBtn />
          </ContentComponent>
        );
      default:
        return (
          <ContentComponent header="Request Visa Fee Payment" >
            <p>
              To proceed with your visa application, you need to make the
              necessary visa fee payment.
              {/* If you require financial assistance,
              please submit a formal request for the visa fee payment. */}
            </p>
            <p>
              Once your request is reviewed and approved, the payment will be
              processed accordingly, and you will receive further instructions
              on the next steps. Kindly ensure that all required details are
              provided in your request to avoid delays.
            </p>
            <p>
              Click the button below to submit your request. If you have any
              questions or need assistance, feel free to contact the{" "}
              <Link to="/create-ticket" className="text-primary-light">
                support team.
              </Link>
            </p>
            <ModalBtn />
          </ContentComponent>
        );
    }
  };
  return <div className="mt-5">{status()}</div>;
}

export default VisaPaymentStatus;
