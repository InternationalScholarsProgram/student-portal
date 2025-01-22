import { Link } from "react-router-dom";
import Loader from "../../../components/loaders/Loader";
import ProgramConditions from "./components/ProgramConditions";
import useSwitchProgram from "./hook/useSwitchProgram";

const SwitchPrograms = () => {
  const { programOption, calculatedBalance, handleSwitch, requiredPay } =
    useSwitchProgram();

  if (!programOption || !calculatedBalance) return <Loader />;

  return (
    <main>
      <h3>Current Program Option : {programOption}</h3>
      <section className="p-6 card col">
        <ProgramConditions
          programOption={programOption}
          balance={calculatedBalance}
          requiredPay={requiredPay}
          handleSwitch={handleSwitch}
        />
      </section>
      <button onClick={() => handleSwitch.mutate()}>Test</button>
      <Link to="/contract/onboarding-agreement">{" "}Contract</Link>
    </main>
  );
};

export default SwitchPrograms;
