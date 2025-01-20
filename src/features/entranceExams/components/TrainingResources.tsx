import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gmatResources } from "../gmat/components/utils";

const tabs = ["Quant", "Verbal", "Data Insights", "Others"];

function TrainingResources() {
  const { state } = useLocation();
  const [show, setShow] = useState(tabs[0]);

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
          <Link
            to={item.url}
            key={item.name}
            className="drop-shadow-md shadow-lg rounded-md bg-paper col p-3 overflow-clip hover:scale-105"
          >
            <p className="font-bold">{item.name}</p>
            <p className="text-sm">{item.description}</p>
            <p className="text-primary-light underline">View</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TrainingResources;
