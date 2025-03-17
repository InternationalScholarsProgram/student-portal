import LoanGuides from "./components/LoanGuides";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { loans } from "./utils";

function Funding() {
  return (
    <main className="">
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
      <LoanGuides />
      <div className="py-2">
        <Outlet />
      </div>
    </main>
  );
}

export default Funding;
