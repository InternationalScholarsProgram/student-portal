import { Drawer } from "@mui/material";
import Sidebar from "./Sidebar";
import useSidebarStore from "./useSidebarStore";

const SidebarDrawer = () => {
  const { drawer, toggleDrawer } = useSidebarStore();
  return (
    <Drawer open={drawer} onClose={toggleDrawer}>
      <aside className="bg-paper scrollbar-hidden w-[60vw] sm:max-w-[40vw] lg:max-w-[35vw] h-screen-dvh">
        <Sidebar />
      </aside>
    </Drawer>
  );
};

export default SidebarDrawer;
