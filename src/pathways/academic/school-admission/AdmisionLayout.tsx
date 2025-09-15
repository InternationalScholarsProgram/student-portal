import { Navigate, Outlet, useLocation } from "react-router";
import TopTab from "../../../components/TopTab";

const tabs = [
  { to: "/pathways/academic/school-admission/requirements", label: "Requirements" },
  { to: "/pathways/academic/school-admission/application", label: "Applications" },
];

function AdmisionLayout() {
  const location = useLocation();

  if (location?.pathname === "/school-admission")
    return <Navigate to="/pathways/academic/school-admission/requirements" replace />;
  return (
    <main>
      {location?.pathname.includes("view-school") ? null : (
        <TopTab tabs={tabs} link />
      )}
      <Outlet />
    </main>
  );
}

export default AdmisionLayout;
