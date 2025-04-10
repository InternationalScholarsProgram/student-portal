import { Outlet } from "react-router";
import LoanGuides from "./components/LoanGuides";
import ErrorBoundary from "../../router/ErrorBoundary";

function Funding() {
  return (
    <main className="">
      {/* {loans.length > 1 && (
        <header className="hidden sm:flex">
          <ul className="ul-links w-full">
            {loans.map((loan) => (
              <NavLink
                key={loan.to}
                className={({ isActive }) => (isActive ? "selected" : "")}
                to={loan.to}
              >
                <p className="first-letter:uppercase">{loan.name}</p>
              </NavLink>
            ))}
          </ul>
        </header>
      )} */}
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
