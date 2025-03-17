import FundingOptions from "./FundingOptions";
import useTuition from "../../services/useTuition";
import BookFundingAdvisoryMeeting from "./BookFundingAdvisoryMeeting";
import MeetingStatus from "./MeetingStatus";
import SelectSchool from "./SelectSchool";
import LoanApplication from "../../components/LoanApplication";

function FundingAdvisory() {
  const { status } = useTuition();
  if (status === 1) return <BookFundingAdvisoryMeeting />;
  if (status === 2) return <MeetingStatus />;
  if (status === 3) return <FundingOptions />;
  if (status === 4) return <SelectSchool />;
  if (status === 5) return <LoanApplication />;
}

export default FundingAdvisory;
