import useTuition from "../../services/useTuition";
import BookFundingAdvisoryMeeting from "./BookFundingAdvisoryMeeting";
import UpcomingMeeting from "./UpcomingMeeting";

function FundingAdvisory() {
  const { fundingAdvisory } = useTuition();
  if (!fundingAdvisory) return <BookFundingAdvisoryMeeting />;

  switch (fundingAdvisory?.status) {
    case 1:
      return <UpcomingMeeting fundingAdvisory={fundingAdvisory} />;
    case 3:
      return (
        <BookFundingAdvisoryMeeting
          dateAndTime={fundingAdvisory?.dateAndTime}
        />
      );
  }
}

export default FundingAdvisory;
