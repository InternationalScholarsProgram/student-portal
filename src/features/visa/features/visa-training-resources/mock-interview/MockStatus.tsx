import dayjs from "dayjs";
import { CalendlyMockVisaInterview } from "../../../../../components/Calendly";
import { VisaObject } from "../../../types/visaTypes";
import { Event } from "@mui/icons-material";
import { formatDate, splitDate } from "../../../../../utils/utils";
import { useCallback } from "react";

function MockStatus({ visa }: { visa: VisaObject }) {
  // const [mock]
  const mockDateAndTime = useCallback(() => {
    if (!visa?.mock_date) return 0;
    const date = splitDate(visa?.mock_date);
    date.setHours(
      Number(visa?.mock_time?.split(":")[0]),
      Number(visa?.mock_time?.split(":")[1])
    );
    return Math.abs(dayjs(date).diff(dayjs(), "hour"));
  }, [visa]);
  const booked = visa?.mock_date && visa?.mock_time;

  const BookedMocks = () => {
    switch (mockDateAndTime() <= 24) {
      case true:
        return (
          <>
            <div className="card mt-2 p-2">
              <div className="">
                <h4>
                  <Event /> You did not turn up for the mock interview!
                </h4>
                {mockDateAndTime() <= 24 ? (
                  <p>
                    Sorry, due to your failure to attend or reschedule the
                    previous meeting you are barred from requesting another mock
                    interview session for one day. Please try again after 24
                    hours.
                  </p>
                ) : (
                  <div className="col">
                    <CalendlyMockVisaInterview />
                  </div>
                )}
              </div>
            </div>
          </>
        );
      default:
        return (
          <div className="card">
            <div className="col p-2">
              <h4>Upcoming Mock Visa Interview</h4>
              <p>
                Your mock visa interview is scheduled for{" "}
                <b>{formatDate(visa?.mock_date)}</b> at <b>{visa?.mock_time}</b>
                .
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
              />
              <a href={visa?.zoom_link || ""} target="_blank" className="primary-btn">
                Join Meeting
              </a>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {visa?.status === 6 && (
        <div className="card alert alert-danger mt-2">
          <div className="card-header">
            <h4>Sorry, your mock visa interview request was rejected </h4>
          </div>

          <div className="card-body">
            <p>
              You were denied a mock visa interview session because of the
              reason below. Kindly work on it and try to resubmit the request.
              <strong>
                <em>Reviewer's comment : $rejection</em>
              </strong>
            </p>

            <CalendlyMockVisaInterview />
          </div>
        </div>
      )}

      {booked ? (
        <BookedMocks />
      ) : (
        <>
          <div className="col gap-2 p-3 card">
            <p>
              Your visa interview is approaching soon, and we want to help you
              prepare with confidence. Booking a mock interview can help you
              practice answering questions, reduce anxiety, and increase your
              chances of success. Secure your session now to get personalized
              feedback and guidance.
            </p>
            <CalendlyMockVisaInterview />
          </div>
        </>
      )}
    </div>
  );
}

export default MockStatus;
