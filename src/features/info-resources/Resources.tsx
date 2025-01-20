import { useState } from "react";
import OnboardingSteps from "./components/OnboardingSteps";
import CreatingMBA from "./components/CreatingMBA";
import CreatingETS from "./components/CreatingETS";

const resources = [
  "Onboarding Steps",
  "Creating MBA account",
  "Creating ETS account",
];

function Resources() {
  const [show, setShow] = useState("Onboarding Steps");
  return (
    <>
      <main className="content-container">
        <section className="card w-full py-3 col justify-center">
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
          <div className="py-3 col h-[70vh]">
            {show === "Onboarding Steps" ? (
              <OnboardingSteps />
            ) : show === "Creating MBA account" ? (
              <CreatingMBA />
            ) : (
              <CreatingETS />
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Resources;
