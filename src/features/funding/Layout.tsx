import { Outlet } from "react-router";
import LoanGuides from "./components/LoanGuides";
import ErrorBoundary from "../../router/ErrorBoundary";

function Funding() {
  return (
    <main className="">
      <LoanGuides />
      <div className="py-2">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default Funding;
