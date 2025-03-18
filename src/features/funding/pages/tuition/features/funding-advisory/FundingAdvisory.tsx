import FundingOptions from "./FundingOptions";
import useTuition from "../../services/useTuition";
import BookFundingAdvisoryMeeting from "./BookFundingAdvisoryMeeting";
import MeetingStatus from "./MeetingStatus";
import SelectSchool from "./SelectSchool";
import LoanApplication from "../../components/LoanApplication";

function FundingAdvisory() {
  const { tuitionStatus } = useTuition();

  if (tuitionStatus === 1) return <BookFundingAdvisoryMeeting />;
  if (tuitionStatus === 2) return <MeetingStatus />;
  if (tuitionStatus === 3) return <FundingOptions />;
  if (tuitionStatus === 4) return <SelectSchool />;
  if (tuitionStatus === 5) return <LoanApplication />;
}

export default FundingAdvisory;
