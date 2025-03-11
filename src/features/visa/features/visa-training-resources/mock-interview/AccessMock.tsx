import { useMemo } from "react";
import { formatDate } from "../../../../../utils/utils";
import useVisa from "../../../services/hooks/useVisa";
import CanBookMock from "./CanBookMock";
import GradedMock from "./GradedMock";
import RejectedMockRequest from "./RejectedMockRequest";
import SevisFees from "../../../components/payments/SevisFees";

function AccessMock() {
  const { visa, sevisPayments, isMockMarksQualified } = useVisa();
  const within7Days = useMemo(
    () => isWithin7Days(visa?.interviewDateAndTime),
    [visa?.interviewDateAndTime]
  );

  if (visa?.status === 6) return <RejectedMockRequest />;
  if (visa?.status === 7)
    return (
      <div className="col gap-7">
        <SevisFees />
        {!sevisPayments ? <GradedMock /> : null}
      </div>
    );

  return (
    <div className="col">
      <h3 className="title-sm mt-3"> Mock Interview</h3>
      {within7Days ? (
        <CanBookMock hasBooked={Boolean(visa?.mock_date && visa?.mock_time)} />
      ) : (
        <div className="col gap-2 p-3 card">
          <p>
            Your visa interview is currently scheduled for{" "}
            {formatDate(visa.interview_date)}, which is more than 7 days from
            today. At this time, you are not eligible to request a mock
            interview. Once your interview date falls within the 7-day window,
            the option to book a mock interview will become available.
          </p>
        </div>
      )}
    </div>
  );
}

export default AccessMock;

function isWithin7Days(dateStr: Date | string) {
  const dateToCheck = new Date(dateStr);
  const today = new Date();

  // Set time to 00:00:00 for an accurate day comparison
  today.setHours(0, 0, 0, 0);
  dateToCheck.setHours(0, 0, 0, 0);

  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);

  return dateToCheck >= today && dateToCheck <= sevenDaysFromNow;
}

// mysqli_query($conn, "UPDATE visa_interview SET status = 4, mock_time = '$start_time', mock_date = '$date', reschedule_url = '$reschedule_url', end_time = '$end_time', cancel_url = '$cancel_url', event = '$event_uri', zoom_link = '$zoom_link', advisor = '$advisor' WHERE stu_id = '$intake_id'") or die(mysqli_error($conn));
