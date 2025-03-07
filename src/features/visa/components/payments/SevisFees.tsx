import { useState } from "react";
import SevisFeesPayment from "./SevisFeesPayment";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import Modal from "../../../../components/Modal";
import useVisa from "../../services/hooks/useVisa";
import { CalendlyMockVisaInterview } from "../../../../components/Calendly";

function SevisFees() {
  const { sevisPayments, mockTotalMarks } = useVisa();
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const PaymentModal = () => (
    <Modal open={open} setOpen={toggleModal} title="Request SEVIS fee Payment">
      <div className="modal">
        {mockTotalMarks >= 70 ? (
          <SevisFeesPayment toggleModal={toggleModal} />
        ) : (
          <div>
            <p>
              Regrettably, you didn't achieve an 70% or higher on your mock
              interview. However, the program will cover your SEVIS fee after
              your real visa interview, once you receive positive feedback
              (whether an approved visa or administrative processing) from your
              country's consulate.
            </p>
            <FormFooterBtns onClose={toggleModal} hideBtn />
          </div>
        )}
      </div>
    </Modal>
  );

  switch (sevisPayments?.status) {
    case 1:
      return (
        <StatusComponent header="Your SEVIS fee payment request has been received">
          <p>
            Your SEVIS fee request has been received and is being processed.
            Kindly be patient as our team reviews your request.
          </p>
          <p>
            Kindly be patient as our team reviews it. When it is approved, you
            will receive further instructions here.
          </p>
        </StatusComponent>
      );
    case 2:
      return (
        <StatusComponent header="Your payment has been approved">
          <p>
            Your SEVIS fee payment request has been approved. The payment will
            be processed by our team as requested, based on the visa approval
            rates at the embassy in your country. All the best in your upcoming
            visa interview. Please ensure you return to this module to provide
            your actual visa interview feedback.
          </p>
        </StatusComponent>
      );
    case 3:
      return (
        <StatusComponent header="Payment Rejected">
          <p>
            Your SEVIS fee request has been denied. Please read the reviewers
            comment below and resubmit your request.
          </p>
          <em>Reviewer's Comment : {sevisPayments.reason_denied}</em>
          <p>Please resubmit a request to have your SEVIS fees paid.</p>
          <button
            onClick={() => setOpen(true)}
            className="primary-btn self-end"
          >
            Request SEVIS Fees Payment
          </button>
          <PaymentModal />
        </StatusComponent>
      );
    case 4:
      return (
        <StatusComponent header="Your payment has been completed">
          <p>
            Your SEVIS fee request has been completed. Please use your SEVIS
            number to track your status. In case your SEVIS payment is not
            reflecting on your SEVIS record, please submit a ticket.
          </p>
          <a
            href="https://fmjfee.com/i901fee/index.html?content=status/checkStatus"
            target="_blank"
            className="primary-btn self-end"
          >
            Track Sevis Status
          </a>
        </StatusComponent>
      );
    default:
      return (
        <StatusComponent header="Request SEVIS Fee Payment">
          <p>
            The SEVIS fee is a mandatory payment required for your visa
            application process. If you need assistance covering this fee, you
            can submit a request to the administrator for payment support.
          </p>
          <p>
            Click the button below to send a formal request to the admin team.
            Ensure that you have completed all necessary steps in your
            application before proceeding with the request.
          </p>
          <div className="row justify-end gap-2">
            <button className="primary-btn" onClick={toggleModal}>
              Request SEVIS Fee Payment
            </button>
          </div>
          <PaymentModal />
        </StatusComponent>
      );
  }
}

export default SevisFees;
const StatusComponent = ({ header, children }: any) => (
  <div>
    <h3 className="title-sm">{header}</h3>
    <div className="col card p-3">{children}</div>
  </div>
);
