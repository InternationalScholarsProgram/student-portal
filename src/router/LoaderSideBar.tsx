import { Drawer } from "@mui/material";
import React, { useState } from "react";
import Loader from "../components/loaders/Loader";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function LoaderSideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const toogleSideBar = () => setShowSideBar(!showSideBar);
  return (
    <>
      {/* <Drawer
        open={showSideBar}
        onClose={toogleSideBar}
        // onClick={toogleSideBar}
      >
        <aside className="bg-paper scrollbar-hidden w-[60vw] sm:max-w-[40vw] lg:max-w-[35vw] h-screen-dvh">
          <Sidebar />
        </aside>
      </Drawer> */}
      <main className="row h-[100dvh] overflow-x-hidden scrollbar-scheme">
        <aside className="sidebar"></aside>

        <div className="flex-1 overflow-y-auto col items-center bg-default">
          <nav className="row-center sticky left-0 top-0 w-full h-[9vh] bg-paper z-50"></nav>
          <article className="mx-2 my-1 content-container col items-center overflow-y-auto overflow-x-clip">
            <Loader />
          </article>
        </div>
      </main>
    </>
  );
}

export default LoaderSideBar;
