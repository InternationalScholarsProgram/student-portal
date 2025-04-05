import ContentComponent from "../../../../../../components/ContentComponent";
import {
  convertToDateAndTime,
  formatDateAndTime,
} from "../../../../../../utils/utils";
import dayjs from "dayjs";
import { useSubsequentMeeting } from "./useSubsequentMeeting";
import UpcomingMeeting from "../funding-advisory/UpcomingMeeting";
import BookSubsequent from "./BookSubsequent";
import { CalendlyFundingAdvisory } from "../../../../../../components/Calendly";
import ContactSupport from "../../../../../../components/ContactSupport";
import { InlineLoader } from "../../../../../../components/loaders/Loader";
import AxiosError from "../../../../../../components/errors/AxiosError";

const SubsequentMeeting = () => {
  const { subsequentMeeting, isLoading, error } = useSubsequentMeeting();

  const meeting = subsequentMeeting?.booked_meeting;
  const meetingRequest = subsequentMeeting?.subsequent_meeting_request;
  const dateAndTime = convertToDateAndTime(meeting?.date, meeting?.time);

  const isMoreThan24Hours = dayjs(new Date()).diff(dateAndTime, "hour") > 24;

  if (isLoading) return <InlineLoader />;
  if (error) return <AxiosError error={error} />;

  switch (subsequentMeeting?.status) {
    case 1:
      return <UpcomingMeeting fundingAdvisory={{ ...meeting, dateAndTime }} />;
    case 0:
    case 6:
      return (
        <ContentComponent header="Subsequent Funding Advisory Meeting">
          <div className="col gap-2">
            <p className="mb-2">
              it's time to book your <strong>Funding Advisory Meeting</strong>.
              In this session, we'll:
            </p>
            <ul className="list-disc pl-6">
              <li>Guide you through your school options</li>
              <li>Connect you with the best loan providers</li>
              <li>Help you secure funding tailored to your needs</li>
            </ul>
            <p>Schedule a funding a session with us!</p>
            <CalendlyFundingAdvisory classes="primary-btn self-end" />
          </div>
        </ContentComponent>
      );
    case 3:
      return (
        <ContentComponent header="Subsequent Funding Advisory Meeting">
          <div className="col gap-2">
            <p>
              It looks like you missed your funding advisory meeting scheduled
              at <b>{formatDateAndTime(dateAndTime)}</b>. You can reschedule at
              a time that works best for you.
            </p>
            {isMoreThan24Hours ? (
              <div className="col">
                <p>
                  🕒 To continue with your loan application, please reschedule
                  your meeting.
                </p>
                <CalendlyFundingAdvisory classes="primary-btn self-end" />
              </div>
            ) : (
              <p>
                ⏳ Since you missed your meeting, a 24-hour rescheduling
                restriction applies. You’ll be able to book a new meeting after{" "}
                <b>{formatDateAndTime(dayjs(dateAndTime)?.add(24, "hour"))}</b>.
              </p>
            )}
          </div>
        </ContentComponent>
      );
    case 4:
      return (
        <div className="alert">
          <p>
            Your subsequent meeting has been requested and is pending approval.
          </p>
        </div>
      );

    case 5:
      return (
        <ContentComponent header="Subsequent Funding Advisory Meeting">
          <p>
            Your request for a subsequent funding advisory meeting was not
            approved.
          </p>
          <p>
            <b>Reason for rejection:</b> {meetingRequest?.rejection_reason}
          </p>
          <BookSubsequent rejected />
        </ContentComponent>
      );
    case 2:
      return (
        <p>
          Need additional guidance from our funding advisor?
          <BookSubsequent />
          to schedule a follow-up meeting.
        </p>
      );
    default:
      return (
        <div>
          <p>An error occurred, status not found</p>
          <ContactSupport />
        </div>
      );
  }
};

export default SubsequentMeeting;

/* 

0 No funding advisory meeting is booked.
  → The student has not booked a funding advisory meeting yet.
1 There is an upcoming meeting.
  → A meeting has been booked and the scheduled date/time is still in the future.
2 Meeting attended, no subsequent request.
  → The meeting was attended, but the student hasn’t made another request afterward.
3 Missed meeting, no subsequent request.
  → The meeting was missed, and the student hasn’t requested another one.
4 Pending subsequent meeting request.
  → The student requested another meeting after the first, and it’s still awaiting approval.
5 Rejected subsequent meeting request.
  → A follow-up meeting was requested but it was rejected.
6 Subsequent meeting request approved.
  → A follow-up meeting was requested and approved.

*/
