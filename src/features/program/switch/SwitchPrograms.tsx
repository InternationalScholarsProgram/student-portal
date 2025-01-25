import { FullLoader } from "../../../components/loaders/Loader";
import ProgramConditions from "./components/ProgramConditions";
import useSwitchProgram from "./hook/useSwitchProgram";

const SwitchPrograms = () => {
  const { programOption, balance } = useSwitchProgram();

  if (!programOption || !balance) return <FullLoader />;
  return (
    <main>
      <h3 className="row">
        Current Program Option :
        <span className="first-letter:uppercase px-1">{programOption}</span>
      </h3>
      <section className="p-6 card col">
        <ProgramConditions />
      </section>
    </main>
  );
};

export default SwitchPrograms;
