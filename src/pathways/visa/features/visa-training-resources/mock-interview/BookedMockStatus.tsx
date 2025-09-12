import { CalendlyMockVisaInterview } from "../../../../../components/Calendly";
import { formatDate } from "../../../../../utils/utils";
import { Event } from "@mui/icons-material";
import useVisa from "../../../services/hooks/useVisa";
import dayjs from "dayjs";

function BookedMockStatus() {
  const { visa } = useVisa();
  const hoursUntilMock = dayjs(visa?.mockDateAndTime).diff(dayjs(), "hour");
  // Missed interview scenario
  const missedInterview = hoursUntilMock <= 0;
  const isBarred = missedInterview && Math.abs(hoursUntilMock) < 24;

  return (
    <div>
      {missedInterview ? (
        <div className="card mt-2 p-2 col gap-1">
          <h4>
            <Event /> You did not turn up for the mock interview!
          </h4>
          {isBarred ? (
            <p>
              Sorry, due to your failure to attend or reschedule the previous
              meeting you are barred from requesting another mock interview
              session for one day. Please try again after 24 hours.
            </p>
          ) : (
            <div className="col">
              <p>Use the button bellow to reschedule your mock interview</p>
              <CalendlyMockVisaInterview text="Reschedule Mock Interview" />
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <div className="col p-2">
            <h4>Upcoming Mock Visa Interview</h4>
            <p>
              Your mock visa interview is scheduled for{" "}
              <b>{formatDate(visa?.mock_date)}</b> at <b>{visa?.mock_time}</b>.
            </p>
            <p>
              To join the session, please use the following{" "}
              <a className="" href={visa["zoom_link"] || ""} target="_blank">
                Zoom meeting link
              </a>
              .
            </p>
          </div>
          <div className="row justify-end gap-2 p-2">
            <CalendlyMockVisaInterview
              text="Reschedule Mock Interview"
              classes="text-btn"
              url={visa?.reschedule_url}
            />
            <a
              href={visa?.zoom_link || ""}
              target="_blank"
              className="primary-btn"
            >
              Join Meeting
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookedMockStatus;
