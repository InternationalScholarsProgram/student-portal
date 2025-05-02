import { Outlet } from "react-router";
import Instructions from "./components/Instructions";

function EntranceExams() {
  return (
    <main>
      <Instructions />
      <div className="h-3" />
      <Outlet />
    </main>
  );
}

export default EntranceExams;
