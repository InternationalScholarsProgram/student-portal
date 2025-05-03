import React, { useState } from "react";
import FirstPhase from "./FirstPhase";
import SecondPhase from "./SecondPhase";

const Resources = () => {
  const tabs = ["Phase 1", "Phase 2"];
  const [show, setShow] = useState(tabs[0]);
  return (
    <section className="card my-5 col">
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
      <div className="p-3">
        {show === "Phase 1" ? <FirstPhase /> : <SecondPhase />}
      </div>
    </section>
  );
};

export default Resources;
