import { CalendlyFundingAdvisory } from "../../../../../../../components/Calendly";
import ContactSupport from "../../../../../../../components/ContactSupport";
import ContentComponent from "../../../../../../../components/ContentComponent";
import useTuition from "../../../services/useTuition";

const FeedbackStatus = () => {
  const { loanFeedback, fundingAdvisory } = useTuition();
  return (
    <div>
      {loanFeedback?.loan_status === 2 ? (
        <ContentComponent header="Loan Awarded">
          <p>Your loan application has been approved by the lender.</p>
          <p>The next step is to begin processing your I-20 form.</p>
          <ContactSupport />
        </ContentComponent>
      ) : (
        loanFeedback?.loan_status === 3 && (
          <ContentComponent header="Loan denied">
            <div className="col gap-2">
              <p className="mb-2">
                We are sorry your loan application was not approved by the
                lender.
                <br />
                We recommend booking a career advisory meeting to discuss your
                options and next steps.
              </p>
            </div>
            {fundingAdvisory?.status === 2 && (
              <CalendlyFundingAdvisory classes="primary-btn self-end" />
            )}
          </ContentComponent>
        )
      )}
    </div>
  );
};

export default FeedbackStatus;
