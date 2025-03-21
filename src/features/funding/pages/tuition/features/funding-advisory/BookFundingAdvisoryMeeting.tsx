import { CalendlyFundingAdvisory } from "../../../../../../components/Calendly";
import ContentComponent from "../../../../../../components/ContentComponent";
import { formatDate } from "../../../../../../utils/utils";

const BookFundingAdvisoryMeeting: React.FC<{ dateAndTime?: any }> = ({
  dateAndTime,
}) => {
  return (
    <ContentComponent
      header={
        dateAndTime ? (
          "You Missed Your Meeting"
        ) : (
          <p className="text-lg font-semibold text-secondary-main">
            🎉 Congratulations! Your credit review was been{" "}
            <strong>approved</strong>.
          </p>
        )
      }
    >
      {dateAndTime ? (
        <div className="col gap-2">
          <p>
            It looks like you missed your funding advisory meeting scheduled at{" "}
            <b>{formatDate(dateAndTime)}</b>. You can reschedule at a time that
            works best for you.
          </p>
          <p>
            🕒 To continue with your loan application, please reschedule your
            meeting.
          </p>
        </div>
      ) : (
        <div className="col gap-2">
          <p className="mb-2">
            Now that your credit review is approved, it's time to book your{" "}
            <strong>Funding Advisory Meeting</strong>. In this session, we'll:
          </p>
          <ul className="list-disc pl-6">
            <li>Guide you through your school options</li>
            <li>Connect you with the best loan providers</li>
            <li>Help you secure funding tailored to your needs</li>
          </ul>
          <p>Schedule a funding a session with us!</p>
        </div>
      )}
      <CalendlyFundingAdvisory classes="primary-btn self-end" />
    </ContentComponent>
  );
};

export default BookFundingAdvisoryMeeting;
