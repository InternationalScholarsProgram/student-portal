import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { linksWithDivider } from "../../router/linkItems";
import { useStore } from "zustand";
import sideBarStore from "./sideBarStore";

function Sidebar() {
  const { openSections, setOpenSections, initialize } = useStore(sideBarStore);
const location = useLocation();
  useEffect(() => {
    initialize();
  }, [location.pathname]);

  return (
    <main className="flex flex-1 w-full p-3 col relative">
      <div className="h-[11vh] col-center sticky">
        <Logo />
      </div>

      <ul className="portal-sidebar-ul col py-3 overflow-y-auto  overflow-x-clip">
        {linksWithDivider.map((item: any, index) => {
          if (item?.hidden) return null;
          if (item?.type === "hidden")
            return (
              <p key={index} className="my-5">
                {item.name}sassss
              </p>
            );
          if (item?.type === "divider") {
            return (
              <p key={index} className="my-5">
                {item.name}
              </p>
            );
          }

          if (item.subItems) {
            const isOpen = openSections[item.name] || false;
            return (
              <React.Fragment key={index}>
                <button
                  onClick={() => setOpenSections(item.name)}
                  className="sidebar-link"
                >
                  {item.icon}
                  <p>{item.name}</p>
                  <div className="flex-1 row justify-end">
                    {isOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
                  </div>
                </button>
                <Collapse
                  in={isOpen}
                  timeout="auto"
                  unmountOnExit
                  className="pl-[10%] opacity-80"
                >
                  {item.subItems.map((subItem: any) => (
                    <NavLink
                      key={subItem.name}
                      to={subItem.to}
                      className={({ isActive }) =>
                        isActive ? "active-link" : ""
                      }
                    >
                      <p>{subItem.name}</p>
                    </NavLink>
                  ))}
                </Collapse>
              </React.Fragment>
            );
          }

          if (item.name === "WebMail") {
            return (
              <button
                key={index}
                onClick={() =>
                  window.open(
                    "https://internationalscholarsprogram.com/webmail"
                  )
                }
                className="sidebar-link"
              >
                {item.icon}
                <p>{item.name}</p>
              </button>
            );
          }

          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {item.icon}
              <p>{item.name}</p>
            </NavLink>
          );
        })}
      </ul>
    </main>
  );
}

export default Sidebar;
