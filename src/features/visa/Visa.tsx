import CheckI20 from "./features/ds-160/CheckI20";
import VisaGuide from "./components/VisaGuide";
import VisaTrainingStatus from "./features/visa-training-resources/VisaTrainingStatus";
import useVisa from "./services/hooks/useVisa";
import DS160req from "./features/ds-160/DS160req";
import DS160Review from "./features/ds-160/DS160Review";
import { FullLoader } from "../../components/loaders/Loader";

function Visa() {
  const { stage, isLoading } = useVisa();
  if (isLoading) return <FullLoader />;
  return (
    <main>
      <VisaGuide />
      {stage === 0 && <CheckI20 />}
      {stage === 1 && <DS160req />}
      {stage === 2 && <DS160Review />}
      {stage === 3 && <VisaTrainingStatus />}
    </main>
  );
}

export default Visa;
