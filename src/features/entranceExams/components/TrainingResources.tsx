import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gmatResources } from "../features/gmat/components/utils";
import ViewResource from "./ViewResource";

const tabs = ["Quant", "Verbal", "Data Insights", "Others"];

function TrainingResources() {
  const { state } = useLocation();
  const [show, setShow] = useState(tabs[0]);
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const [resource, setResource] = useState({});

  return (
    <div className="w-full">
      <header>
        <h3 className="py-4 p-2 opacity-70">
          {state?.name} Training Resources
        </h3>
      </header>
      <ul className="ul-links">
        {tabs.map((tab) => (
          <button
            className={tab === show ? "selected" : ""}
            key={tab}
            onClick={() => setShow(tab)}
          >
            {tab}
          </button>
        ))}
      </ul>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-clip p-2 ">
        {gmatResources.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setResource({
                category: "quant",
                description: "desc desc desc",
                id: 5,
                link: "Official GMAT Training Handbook_V1.0.pdf",
                phase: "1",
                status: 1,
                test_type: "GMAT",
                title: "Resource test",
                type: "pdf",
                week: 1,
              });
              toggleModal();
            }}
            className="drop-shadow-md shadow-lg rounded-md bg-paper col p-3 overflow-clip hover:scale-105 cursor-pointer"
          >
            <p className="font-bold">{item.name}</p>
            <p className="text-sm">{item.description}</p>
            <p className="text-primary-light underline">Views</p>
          </div>
        ))}
      </div>
      <ViewResource open={open} toggleModal={toggleModal} resource={resource} />
    </div>
  );
}

export default TrainingResources;
