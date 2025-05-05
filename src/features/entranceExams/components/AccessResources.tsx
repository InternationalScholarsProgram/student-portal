import { useState } from "react";
import TrainingMaterials from "./TrainingMaterials";
import MockTests from "./MockTests";
import TopTab from "../../../components/TopTab";

const AccessResources = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section className="my-5 col">
      <TopTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="card p-3">
        {activeTab === tabs[0] ? <TrainingMaterials /> : <MockTests />}
      </div>
    </section>
  );
};

export default AccessResources;
const tabs = ["Training Materials", "Mock Tests"];
