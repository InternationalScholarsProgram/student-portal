import CheckI20 from "./features/ds-160/CheckI20";
import VisaGuide from "./components/VisaGuide";
import VisaTrainingStatus from "./features/visa-training-resources/VisaTrainingStatus";
import useVisa from "./services/hooks/useVisa";
import DS160req from "./features/ds-160/DS160req";
import DS160Review from "./features/ds-160/DS160Review";
import { FullLoader } from "../../components/loaders/Loader";
import FeedbackStatus from "./features/visa-feedback/FeedbackStatus";
import ContactSupport from "../../components/ContactSupport";
import React from "react";

import SevisFees from "./components/payments/SevisFees";

function Visa() {
  const { stage, isLoading, visa } = useVisa();
  if (isLoading) return <FullLoader />;
  console.log(
    "Visa parent → stage:",
    stage,
    "hasInterviewDatePassed:",
    visa?.hasInterviewDatePassed
  );
  return (
    <main>
      <VisaGuide />
      <StageComponent datePassed={visa?.hasInterviewDatePassed} stage={stage} />
    </main>
  );
}

export default Visa;

// declared outside the component to prevent re-renders and memory leak,and  unneccessary use of useCallback
type Props = {
  stage: number;
  datePassed: boolean;
};

const StageComponent: React.FC<Props> = ({ stage, datePassed }) => {
  console.log("datePassed:", datePassed);
  if (stage === 0) return <CheckI20 />;
  if (stage === 1) return <DS160req />;
  if (stage === 2) return <DS160Review />;
  if (stage === 3) {
    if (datePassed) {
      // Show FeedbackStatus, then SEVIS status just below it
      return (
        <>
          <FeedbackStatus />
          <SevisFees />
        </>
      );
    }
    return <VisaTrainingStatus />;
  }
  return <ContactSupport />;
};
