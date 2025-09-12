import { useCallback, useMemo, useState } from "react";
import useVisa from "../../services/hooks/useVisa";
import VisaPaymentModal from "./VisaPaymentModal";
import Expedite from "../../features/expedite/Expedite";
import VisaTrainingStatus from "../../features/visa-training-resources/VisaTrainingStatus";
import { Link } from "react-router-dom";
import ContentComponent from "../../../../components/ContentComponent";
import { formatDateAndTime } from "../../../../utils/utils";
import ContactSupport from "../../../../components/ContactSupport";

const ModalBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="primary-btn self-end" onClick={() => setOpen(!open)}>
        Request Visa Payment
      </button>
      <VisaPaymentModal open={open} toggleModal={() => setOpen(!open)} />
    </>
  );
};

function VisaPaymentStatus() {
  const { visaPayments, pastFeedbacks, visaBookingLink } = useVisa();
  console.log(visaBookingLink, "visaBookingLink");

  const status = () => {
    switch (visaPayments?.status) {
      case 1:
        return (
          <ContentComponent header="Visa Payment Request">
            <p>
              Your request for visa fees payment has been submitted successfully
            </p>
            <p>Kindly be patient as our team reviews your request</p>
            <ContactSupport />
          </ContentComponent>
        );
      case 2:
        return (
          <section className="col gap-3">
            <div className="col gap-2 mt-2 px-3">
              <p>
                Please use the following link to book your visa interview.{" "}
                <Link
                  to={visaBookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-main px-1 font-semibold border-b-2 border-primary-main hover:scale-105"
                >
                  Book Visa Interview
                </Link>
              </p>
              {pastFeedbacks ? (
                <p>
                  Since we covered the cost of your previous visa interview, we
                  are unable to fund any further attempts.
                </p>
              ) : (
                <p>
                  Your visa fee payment has been approved and disbursed to you
                  on {formatDateAndTime(visaPayments?.dateapp)}. You may now
                  submit the payment to the embassy and schedule your visa
                  interview. Additionally, you have been granted access to a
                  visa expedite letter if needed.
                </p>
              )}
            </div>
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
              <strong>Reviewer's Comment : </strong>
              <em>{visaPayments?.reason_denied}</em>
            </p>
            <ModalBtn />
          </ContentComponent>
        );
      default:
        return (
          <ContentComponent header="Request Visa Fee Payment">
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
  const Status = useCallback(status, [visaPayments?.status]);
  return <div className="mt-5" children={<Status />} />;
}

export default VisaPaymentStatus;
