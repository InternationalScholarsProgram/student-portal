import CheckI20 from "./features/ds-160/CheckI20";
import VisaGuide from "./components/VisaGuide";
import Expedite from "./features/expedite/Expedite";
import TrainingResources from "./features/training-resources/TrainingResources";
import useVisa from "./services/hooks/useVisa";

function Visa() {
  const { stage } = useVisa();
  return (
    <main>
      <VisaGuide />
      {stage === 0 && <CheckI20 />}
      {stage === 1 && <CheckI20 />}
      {stage === 2 && <CheckI20 />}
      {stage === 3 && (
        <section>
          <div>
            <p className="my-2 p-3">
              Your visa fee payment has been approved and disbursed to you. You
              may now submit it to the embassy and schedule a visa interview
              date. You have also been granted access to visa expedite letter
              (if you need it). To access the visa training resources, please
              submit the request using the button below.
            </p>
          </div>
          <TrainingResources />
          <Expedite />
        </section>
      )}
    </main>
  );
}

export default Visa;
