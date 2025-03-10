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

  const getStageComponent = () => {
    if (stage === 0) return <CheckI20 />;
    if (stage === 1) return <DS160req />;
    if (stage === 2) return <DS160Review />;
    if (stage === 3) {
      if (visa?.hasInterviewDatePassed) return <FeedbackStatus />;
      return <VisaTrainingStatus />;
    }
    return (
      <p className="text-center">Invalid stage. Please contact support.</p>
    );
  };
  return (
    <main>
      <VisaGuide />
      {getStageComponent()}
    </main>
  );
}

export default Visa;
