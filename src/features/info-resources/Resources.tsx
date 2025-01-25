import { useState } from "react";
import OnboardingSteps from "./components/OnboardingSteps";
import CreatingMBA from "./components/CreatingMBA";
import CreatingETS from "./components/CreatingETS";

const resources = ["Onboarding", "MBA account", "ETS account"];

function Resources() {
  const [show, setShow] = useState(resources[0]);
  return (
    <main className="">
      <ul className="ul-links">
        {resources.map((resource) => (
          <button
            className={resource === show ? "selected" : ""}
            key={resource}
            onClick={() => setShow(resource)}
          >
            {resource}
          </button>
        ))}
      </ul>
      <section className="card py-3 col">
        {show === resources[0] ? (
          <OnboardingSteps />
        ) : show === resources[1] ? (
          <CreatingMBA />
        ) : (
          <CreatingETS />
        )}
      </section>
    </main>
  );
}

export default Resources;
