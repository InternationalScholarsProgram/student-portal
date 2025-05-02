import { useState } from "react";
import FirstPhase from "./components/FirstPhase";
import SecondPhase from "./components/SecondPhase";
import useGMAT from "./services/useGMAT";
import EnrollmentStatus from "../../components/EnrollmentStatus";
import { InlineLoader } from "../../../../components/loaders/Loader";
import AxiosError from "../../../../components/errors/AxiosError";

const tabs = ["Phase 1", "Phase 2"];

function Gmat() {
  const { status, invalidate, error, isLoading, testType } = useGMAT();
  const [show, setShow] = useState(tabs[0]);

  if (isLoading) return <InlineLoader />;
  if (error) return <AxiosError error={error} />;

  switch (status?.status) {
    case 0:
    case 1:
    case 3:
      return (
        <EnrollmentStatus
          invalidate={() => invalidate("status")}
          type={testType}
          status={status?.status}
          reason={status?.admin_comment}
        />
      );
    case 2:
    case 4:
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

    default:
      return <div>Something went wrong</div>;
  }
}

export default Gmat;
