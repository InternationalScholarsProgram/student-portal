import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { formatDateAndTime } from "../../../../../../utils/utils";
import RescheduleMeeting from "./RescheduleMeeting";
import { Link } from "react-router-dom";
import ContentComponent from "../../../../../../components/ContentComponent";
import { FundingAdvisoryProps } from "../../../../types/fundingTypes";
type Props = { fundingAdvisory: FundingAdvisoryProps };

const UpcomingMeeting: React.FC<Props> = ({ fundingAdvisory }) => {
  return (
    <ContentComponent
      header={
        <p className="p-2 opacity-70 font-semibold row-center w-fit gap-1">
          <CalendarMonthIcon color="primary" />
          <span className="text-primary-light">
            Your Funding Advisory Meeting Awaits! ✨
          </span>
        </p>
      }
    >
      <div className="">
        <p>
          We’re excited to guide you through your funding journey! Your
          personalized advisory session is scheduled for: 📅
          <b>{formatDateAndTime(fundingAdvisory?.dateAndTime)}</b>
        </p>
        <p className="mt-2">
          During this session, you’ll have the opportunity to:
        </p>
        <ul className="list-disc pl-6 mt-1">
          <li>Receive expert advice on funding strategies</li>
          <li>Explore the best options tailored to your needs</li>
          <li>Ask questions and get real-time answers</li>
        </ul>
        <p>We look forward to connecting with you!</p>
      </div>
      <div className="row justify-end gap-3">
        <div className="col justify-center flex-1">
          <Link to={fundingAdvisory?.cancel_url} className="text-btn">
            Cancel
          </Link>
        </div>
        <RescheduleMeeting url={fundingAdvisory?.reschedule_url} />
        <Link
          to={fundingAdvisory?.zoom_link}
          target="_blank"
          className="primary-btn"
        >
          Join via Zoom
        </Link>
      </div>
    </ContentComponent>
  );
};

export default UpcomingMeeting;
