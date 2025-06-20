import { Navigate, Outlet, useLocation } from "react-router";
import useAdmissions from "./services/useAdmissions";
import { FullLoader } from "../../components/loaders/Loader";
import TopTab from "../../components/TopTab";

const tabs = [
  { to: "/school-admission/requirements", label: "Requirements" },
  { to: "/school-admission/application", label: "Application" },
];

function AdmisionLayout() {
  const { isLoading } = useAdmissions();
  const location = useLocation();

  if (isLoading) return <FullLoader />;

  if (location?.pathname === "/school-admission")
    return <Navigate to="/school-admission/requirements" replace />;

  return (
    <main>
      <TopTab tabs={tabs} link />
      <Outlet />
    </main>
  );
}

export default AdmisionLayout;
