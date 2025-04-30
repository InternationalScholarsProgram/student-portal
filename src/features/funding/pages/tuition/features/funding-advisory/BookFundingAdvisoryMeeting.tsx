import dayjs from "dayjs";
import { CalendlyFundingAdvisory } from "../../../../../../components/Calendly";
import ContentComponent from "../../../../../../components/ContentComponent";
import { formatDateAndTime } from "../../../../../../utils/utils";

const BookFundingAdvisoryMeeting: React.FC<{ dateAndTime?: any }> = ({
  dateAndTime,
}) => {
  const today = dayjs(new Date());
  const isMoreThan24Hours = today.diff(dateAndTime, "hour") < 24;

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
            It appears you missed your scheduled funding advisory meeting on{" "}
            <b>{formatDateAndTime(dateAndTime)}</b>. You are welcome to
            reschedule at a time that is convenient for you.
          </p>
          {isMoreThan24Hours ? (
            <>
              <p>
                To proceed with your loan application, please ensure you
                reschedule your meeting.
              </p>
              <CalendlyFundingAdvisory classes="primary-btn self-end" />
            </>
          ) : (
            <p>
              Please note: A 24-hour rescheduling restriction applies. You will
              be able to book a new meeting after{" "}
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
            Now that your credit review is complete, it's time to schedule your{" "}
            <strong>Funding Advisory Meeting</strong>. During this session, we
            will:
          </p>
          <ul className="list-disc pl-6">
            <li>Guide you through your school options</li>
            <li>Connect you with the best loan providers</li>
            <li>Help you secure funding tailored to your needs</li>
          </ul>
          <p>👉 Schedule your funding advisory session today!</p>
          <CalendlyFundingAdvisory classes="primary-btn self-end" />
        </div>
      )}
    </ContentComponent>
  );
};

export default BookFundingAdvisoryMeeting;
