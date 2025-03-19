import { CalendlyFundingAdvisory } from "../../../../../../components/Calendly";
import ContentComponent from "../../../../../../components/ContentComponent";

const BookFundingAdvisoryMeeting: React.FC<{ missed?: boolean }> = ({
  missed,
}) => {
  return (
    <ContentComponent
      header={
        missed ? (
          "You missed the previous meeting"
        ) : (
          <p className="text-lg font-semibold text-secondary-main">
            🎉 Congratulations! Your credit review was been{" "}
            <strong>approved</strong>.
          </p>
        )
      }
    >
      {missed ? (
        <p>
          It looks like you missed your scheduled funding advisory meeting. You
          can reschedule at a time that works best for you.
        </p>
      ) : (
        <p>
          Now that your credit review is approved, you can proceed to book a{" "}
          <strong>Funding Advisory Meeting</strong>. In this session, we'll
          guide you through your school options and connect you with the best
          loan providers tailored to your needs.
        </p>
      )}
      <CalendlyFundingAdvisory classes="primary-btn self-end" />
    </ContentComponent>
  );
};

export default BookFundingAdvisoryMeeting;
