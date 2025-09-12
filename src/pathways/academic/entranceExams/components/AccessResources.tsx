import { useState } from "react";
import TrainingMaterials from "./TrainingMaterials";
import MockTests from "./MockTests";
import TopTab from "../../../../components/TopTab";
import RequestExamBooking from "./RequestExamBooking";
import { formatDate } from "../../../../utils/utils";

const AccessResources = ({ deadline }: any) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <p className="pb-2">Resources deadline is on {formatDate(deadline)}</p>
      <RequestExamBooking />
      <section className="my-5 col">
        <TopTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="card p-3">
          {activeTab === tabs[0] ? <TrainingMaterials /> : <MockTests />}
        </div>
      </section>
    </>
  );
};

export default AccessResources;
const tabs = ["Training Materials", "Mock Tests"];
