import { useCallback } from "react";
import SevisFeesPayment from "./SevisFeesPayment";
import useVisa from "../../services/hooks/useVisa";
import ContentComponent from "../../../../components/ContentComponent";
import ContactSupport from "../../../../components/ContactSupport";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { Link } from "react-router-dom";

function SevisFees() {
  const { sevisPayments, pastFeedbacks } = useVisa();
  const ModalPayment = useCallback(() => <SevisFeesPayment />, []);

  switch (sevisPayments?.status) {
    case 1:
      return (
        <>
          <ContentComponent header="SEVIS fee payment status">
            <p>
              Your SEVIS fee request has been received and is being processed.
              Kindly be patient as our team reviews your request.
            </p>
            <p>
              Kindly be patient as our team reviews it. When it is approved, you
              will receive further instructions here.
            </p>
            <ContactSupport />
          </ContentComponent>
        </>
      );
    case 2:
    case 4:
      return (
        <ContentComponent header="SEVIS fee payment status">
          {/* {pastFeedbacks ? (
            <p>
              Since we covered the cost of your previous visa interview, we are
              unable to fund any further attempts.
            </p>
          ) : ( 
          )} */}
          <p>
            Your SEVIS fee payment request has been <b>approved</b>. The payment will
            be processed by our team as requested, based on the visa approval
            rates at the embassy in your country. All the best in your upcoming
            visa interview.
          </p>
          <p>
            Please use your SEVIS number to track your status. In case your
            SEVIS payment is not reflecting on your SEVIS record, please submit
            a ticket.
          </p>
          {/* <p>
              Please ensure you return to this module to provide your actual
              visa interview feedback.
            </p> */}
          <FormFooterBtns
            closeText={<Link to="/create-ticket">Create Ticket</Link>}
            btnText={
              <Link
                to="https://fmjfee.com/i901fee/index.html?content=status/checkStatus"
                target="_blank"
                rel="noopener noreferrer"
              >
                Track Sevis Status
              </Link>
            }
          />
        </ContentComponent>
      );
    case 3:
      return (
        <ContentComponent header="SEVIS fee payment status">
          <p>
            Your SEVIS fee request has been denied. Please read the reviewers
            comment below and resubmit your request.
          </p>
          <em>Reviewer's Comment : {sevisPayments.reason_denied}</em>
          <p>Please resubmit a request to have your SEVIS fees paid.</p>
          <ModalPayment />
        </ContentComponent>
      );
    // case 4:
    //   return (
    //     <ContentComponent header="Your payment has been completed">
    //       <p>
    //         Your SEVIS fee request has been completed. Please use your SEVIS
    //         number to track your status. In case your SEVIS payment is not
    //         reflecting on your SEVIS record, please submit a ticket.
    //       </p>
    //       <a
    //         href="https://fmjfee.com/i901fee/index.html?content=status/checkStatus"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="primary-btn self-end"
    //       >
    //         Track Sevis Status
    //       </a>
    //     </ContentComponent>
    //   );
    default:
      return (
        <ContentComponent header="Request SEVIS Fee Payment">
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
          <ModalPayment />
        </ContentComponent>
      );
  }
}

export default SevisFees;
