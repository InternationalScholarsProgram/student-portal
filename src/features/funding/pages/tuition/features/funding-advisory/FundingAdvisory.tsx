import BookFundingAdvisoryMeeting from "./BookFundingAdvisoryMeeting";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContentComponent from "../../../../../../components/ContentComponent";
import { formatDateAndTime } from "../../../../../../utils/utils";
import PrimaryBtn from "../../../../../../components/buttons/PrimaryBtn";
import useTuition from "../../services/useTuition";
import RescheduleMeeting from "./RescheduleMeeting";

function FundingAdvisory() {
  const { fundingAdvisory } = useTuition();

  if (!fundingAdvisory) return <BookFundingAdvisoryMeeting />;

  // switch (2) {
  switch (fundingAdvisory?.status) {
    case 1:
      return (
        <ContentComponent
          header={
            <h3 className="p-2 opacity-70 font-semibold row-center w-fit gap-1">
              <CalendarMonthIcon />
              Upcoming Funding Advisory Meeting
            </h3>
          }
        >
          <div className="">
            <p>Greetings,</p>
            <p>
              Your Funding Advisory Meeting is scheduled on{" "}
              <b>{formatDateAndTime(fundingAdvisory?.date)}</b>
            </p>
            <a
              href={fundingAdvisory?.zoom_link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary-light"
            >
              Meeting Link
            </a>
          </div>
          <div className="row justify-end gap-3">
            <RescheduleMeeting url={fundingAdvisory?.reschedule_url} />
            <PrimaryBtn
              onClick={() => window.open(fundingAdvisory?.zoom_link, "_blank")}
            >
              Join Meeting
            </PrimaryBtn>
          </div>
        </ContentComponent>
      );
    case 2:
      // meeting is attended, proceed
      return null;
    case 3:
      return <BookFundingAdvisoryMeeting missed />;
  }
}

export default FundingAdvisory;
