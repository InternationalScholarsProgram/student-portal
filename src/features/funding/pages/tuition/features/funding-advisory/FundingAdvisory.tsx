import BookFundingAdvisoryMeeting from "./BookFundingAdvisoryMeeting";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContentComponent from "../../../../../../components/ContentComponent";
import { formatDateAndTime } from "../../../../../../utils/utils";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import useTuition from "../../services/useTuition";
import RescheduleMeeting from "./RescheduleMeeting";
import { Link } from "react-router-dom";

function FundingAdvisory() {
  const { fundingAdvisory } = useTuition();

  if (!fundingAdvisory) return <BookFundingAdvisoryMeeting />;

  switch (3) {
    // switch (fundingAdvisory?.status) {
    case 1:
      return (
        <ContentComponent
          header={
            <h3 className="p-2 opacity-70 font-semibold row-center w-fit gap-1">
              <CalendarMonthIcon color="primary" />
              <span className="text-primary-main">
                Your Funding Advisory Meeting Awaits! ✨
              </span>
            </h3>
          }
        >
          <div className="">
            <p>
              We're excited to help you navigate funding opportunities! Your
              personalized advisory session is scheduled for: 📅
              <b>{formatDateAndTime(fundingAdvisory?.date || new Date())}</b>
            </p>
            <p className="mt-2">
              This is your chance to:
              <ul className="list-disc pl-6 mt-1">
                <li>Get expert funding strategy advice</li>
                <li>Review your best options</li>
                <li>Ask questions in real-time</li>
              </ul>
            </p>
          </div>
          <div className="row justify-end gap-3">
            <RescheduleMeeting url={fundingAdvisory?.reschedule_url} />
            <Link
              to={fundingAdvisory?.zoom_link}
              target="_blank"
              className="primary-btn"
            >
              📅 Join via Zoom
            </Link>
          </div>
        </ContentComponent>
      );
    case 2:
      // meeting is attended, proceed
      return null;
    case 3:
      return (
        <BookFundingAdvisoryMeeting
          // dateAndTime={fundingAdvisory?.dateAndTime}
          dateAndTime={new Date()}
        />
      );
  }
}

export default FundingAdvisory;
