import { Drawer } from "@mui/material";
import Sidebar from "./Sidebar";
import useSidebarStore from "./useSidebarStore";

const SidebarDrawer = () => {
  const { drawer, closeDrawer } = useSidebarStore();
  return (
    <Drawer
      open={drawer}
      onClose={() => closeDrawer(true)}
      keepMounted
      ModalProps={{ keepMounted: true }}
    >
      {/* Use the drawer-specific class so it shows on small screens */}
      <aside className="sidebar--drawer scrollbar-hidden">
        <Sidebar />
      </aside>
    </Drawer>
  );
};

export default SidebarDrawer;
