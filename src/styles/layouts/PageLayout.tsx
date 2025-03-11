import { Outlet } from "react-router";

function PageLayout() {
  return (
    <div className="w-screen h-screen overflow-auto">
      <Outlet />
    </div>
  );
}

export default PageLayout;
