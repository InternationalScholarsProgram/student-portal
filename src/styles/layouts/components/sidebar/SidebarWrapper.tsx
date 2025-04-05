import Sidebar from "./Sidebar";
import SidebarDrawer from "./SidebarDrawer";

const SidebarWrapper = () => {
  return (
    <>
      <SidebarDrawer />
      <aside className="sidebar">
        <Sidebar />
      </aside>
    </>
  );
};

export default SidebarWrapper;
