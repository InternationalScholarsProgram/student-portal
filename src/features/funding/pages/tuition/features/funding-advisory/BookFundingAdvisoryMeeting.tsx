import { CalendlyFundingAdvisory } from "../../../../../../components/Calendly";
import ContentComponent from "../../../../../../components/ContentComponent";

function BookFundingAdvisoryMeeting() {
  return (
    <ContentComponent
      header={
        <p className="text-lg font-semibold text-secondary-main">
          🎉 Congratulations! Your credit review has been{" "}
          <strong>approved</strong>.
        </p>
      }
    >
      <p className="">
        You can now proceed to book a <strong>Funding Advisory Meeting</strong>,
        where we will guide you through your school options and connect you with
        the best loan providers tailored to your needs.
      </p>
      <CalendlyFundingAdvisory classes="primary-btn self-end" />
    </ContentComponent>
  );
}

export default BookFundingAdvisoryMeeting;
