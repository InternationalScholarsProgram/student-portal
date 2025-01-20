import { useState } from "react";
import { Outlet } from "react-router";
import { Drawer } from "@mui/material";

import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import BreadcrumbsWrapper from "./components/breadcrumbs/BreadcrumbsWrapper";
import "./styles/global.css";
import "swiper/css";
import "swiper/css/pagination";

function PortalLayout() {
  const [showSideBar, setShowSideBar] = useState(false);
  const toogleSideBar = () => setShowSideBar(!showSideBar);
  return (
    <>
      <Drawer
        open={showSideBar}
        onClose={toogleSideBar}
        // onClick={toogleSideBar}
      >
        <aside className="bg-paper scrollbar-hidden w-[60vw] sm:max-w-[40vw] lg:max-w-[35vw] h-screen-dvh">
          <Sidebar />
        </aside>
      </Drawer>

      <main className="row h-[100dvh] overflow-x-hidden scrollbar-scheme">
        <aside className="sidebar">
          <Sidebar />
        </aside>

        <div className="flex-1 overflow-y-auto col items-center bg-default">
          <nav className="row-center sticky left-0 top-0 w-full bg-paper z-50">
            <Navbar toogleSideBar={toogleSideBar} />
          </nav>
          <article className="mx-2 my-1 content-container col items-center overflow-y-auto overflow-x-clip">
            <BreadcrumbsWrapper />
            <Outlet />
          </article>
        </div>
      </main>
    </>
  );
}

export default PortalLayout;
