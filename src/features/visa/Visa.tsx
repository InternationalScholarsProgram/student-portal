import CheckI20 from "./features/ds-160/CheckI20";
import VisaGuide from "./components/VisaGuide";
import VisaTrainingStatus from "./features/visa-training-resources/VisaTrainingStatus";
import useVisa from "./services/hooks/useVisa";
import DS160req from "./features/ds-160/DS160req";
import DS160Review from "./features/ds-160/DS160Review";
import { FullLoader } from "../../components/loaders/Loader";
import FeedbackStatus from "./features/visa-feedback/FeedbackStatus";

function Visa() {
  const { stage, isLoading, visa } = useVisa();
  if (isLoading) return <FullLoader />;
  return (
    <main>
      <VisaGuide />
      {stage === 0 && <CheckI20 />}
      {stage === 1 && <DS160req />}
      {stage === 2 && <DS160Review />}
      {visa?.hasInterviewDatePassed ? (
        <FeedbackStatus />
      ) : (
        <VisaTrainingStatus />
      )}
    </main>
  );
}

export default Visa;
