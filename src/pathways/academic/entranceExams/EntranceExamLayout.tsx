import Instructions from "./components/Instructions";
import { Outlet } from "react-router";

function EntranceExamLayout() {
  return (
    <main>
      <Instructions />
      <div className="h-3" />
      <Outlet />
    </main>
  );
}

export default EntranceExamLayout;
