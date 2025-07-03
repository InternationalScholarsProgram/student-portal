import { Navigate, Outlet } from "react-router";

import Navbar from "./components/navbar/Navbar";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import SidebarWrapper from "./components/sidebar/SidebarWrapper";
import useFetchUser from "../../services/hooks/useFetchUser";
import Cookies from "js-cookie";

function PortalLayout() {
  const { user } = useFetchUser();
  
  if (!Cookies.get("activeStudentId")) return <Navigate to="/login" />;
  if (user?.report?.toLowerCase() === "disabled")
    return <Navigate to="/disabled" />;
  return (
    <main className="row h-[100dvh] overflow-x-hidden scrollbar-scheme">
      <SidebarWrapper />
      <div className="flex-1 overflow-y-auto col items-center bg-default">
        <nav className="row-center sticky left-0 top-0 w-full bg-paper z-50">
          <Navbar />
        </nav>
        <article className="mx-2 my-1 sm:px-2 content-container col items-center overflow-y-auto overflow-x-clip">
          <BreadcrumbsWrapper />
          <Outlet />
        </article>
      </div>
    </main>
  );
}

export default PortalLayout;
