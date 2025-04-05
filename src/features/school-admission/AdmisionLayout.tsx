import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import useAdmissions from "./services/useAdmissions";
import { FullLoader } from "../../components/loaders/Loader";

const tabs = [
  { to: "/school-admission-requirements", label: "Requirements" },
  { to: "/school-admission-application", label: "Application" },
];

function AdmisionLayout() {
  const { status, isLoading } = useAdmissions();

  if (isLoading) return <FullLoader />;
  return (
    <main>
      {status?.code === 5 && (
        <ul className="ul-links">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) => (isActive ? "selected" : "")}
            >
              {tab.label}
            </NavLink>
          ))}
        </ul>
      )}
      <Outlet />
    </main>
  );
}

export default AdmisionLayout;
