import { Navigate, Outlet, useLocation } from "react-router";
import useAdmissions from "./services/useAdmissions";
import { FullLoader } from "../../components/loaders/Loader";
import TopTab from "../../components/TopTab";

const tabs = [
  { to: "/school-admission/requirements", label: "Requirements" },
  { to: "/school-admission/application", label: "Applications" },
];

function AdmisionLayout() {
  const { isLoading } = useAdmissions();
  const location = useLocation();

  if (isLoading) return <FullLoader />;
  if (location?.pathname === "/school-admission")
    return <Navigate to="/school-admission/requirements" replace />;
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
