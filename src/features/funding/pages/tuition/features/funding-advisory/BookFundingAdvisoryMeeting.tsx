import dayjs from "dayjs";
import { CalendlyFundingAdvisory } from "../../../../../../components/Calendly";
import ContentComponent from "../../../../../../components/ContentComponent";
import { formatDateAndTime } from "../../../../../../utils/utils";

const BookFundingAdvisoryMeeting: React.FC<{ dateAndTime?: any }> = ({
  dateAndTime,
}) => {
  const today = dayjs(new Date());
  const isMoreThan24Hours = today.diff(dateAndTime, "hour") > 24;

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
            <b>{formatDateAndTime(dateAndTime)}</b>. You can reschedule at a
            time that works best for you.
          </p>
          {isMoreThan24Hours ? (
            <>
              <p>
                🕒 To continue with your loan application, please reschedule
                your meeting.
              </p>
              <CalendlyFundingAdvisory classes="primary-btn self-end" />
            </>
          ) : (
            <p>
              ⏳ Since you missed your meeting, a 24-hour rescheduling
              restriction applies. You’ll be able to book a new meeting after{" "}
              <b>
                {dayjs(dateAndTime)
                  .add(24, "hour")
                  .format("dddd, MMMM D [at] h:mm A")}
              </b>
              .
            </p>
          )}
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
          <CalendlyFundingAdvisory classes="primary-btn self-end" />
        </div>
      )}
    </ContentComponent>
  );
};

export default BookFundingAdvisoryMeeting;
