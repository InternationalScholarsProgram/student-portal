import { CalendlyFundingAdvisory } from "../../../../../../components/Calendly";
import useTuition from "../../services/useTuition";
import FundingAdvisory from "./FundingAdvisory";

const SubsequentMeeting = () => {
  const { fundingAdvisory } = useTuition();
  switch (fundingAdvisory?.status) {
    case 2:
      return (
        <div className="col gap-2">
          <p>
            Need additional guidance from our funding advisor?
            <CalendlyFundingAdvisory
              classes="text-primary-main px-2 underline"
              text="Click here"
            />
            to schedule a follow-up meeting.
          </p>
        </div>
      );

    default:
      return <FundingAdvisory />;
  }
};

export default SubsequentMeeting;
