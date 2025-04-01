import useTuition from "../../services/useTuition";
import BookFundingAdvisoryMeeting from "./BookFundingAdvisoryMeeting";
import UpcomingMeeting from "./UpcomingMeeting";

function FundingAdvisory() {
  const { fundingAdvisory, tuitionStatus } = useTuition();
  if (!fundingAdvisory) return <BookFundingAdvisoryMeeting />; //book meeting
  if (tuitionStatus === 5)
    //missed meeting
    return (
      <BookFundingAdvisoryMeeting dateAndTime={fundingAdvisory?.dateAndTime} />
    );

  if (fundingAdvisory?.status === 1) {
    //upcoming/pending
    return <UpcomingMeeting fundingAdvisory={fundingAdvisory} />;
  }
}

export default FundingAdvisory;
