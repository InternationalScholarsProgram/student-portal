import { useState } from "react";
import Instructions from "../components/Instructions";
import FirstPhase from "./components/FirstPhase";
import SecondPhase from "./components/SecondPhase";

const tabs = ["Phase 1", "Phase 2"];

function Gmat() {
  const [show, setShow] = useState(tabs[0]);
  return (
    <main>
      <header className="mb-5">
        <Instructions />
      </header>
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
    </main>
  );
}

export default Gmat;
