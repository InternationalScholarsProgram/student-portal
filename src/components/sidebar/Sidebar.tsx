import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo";
import { linksWithDivider } from "../../router/linkItems";
import { useStore } from "zustand";
import sideBarStore from "./sideBarStore";
import SubItems from "./SubItems";

function Sidebar() {
  const { openSections, setOpenSections, initialize } = useStore(sideBarStore);
  const location = useLocation();
  useEffect(() => {
    initialize();
  }, [location.pathname]);

  return (
    <main className="flex-1 p-3 col">
      <div className="h-[10dvh] col-center">
        <Logo />
      </div>

      <ul className="portal-sidebar-ul flex-1 py-3 overflow-y-auto overflow-x-clip">
        {linksWithDivider.map((item: any, index) => {
          if (item?.hidden) return null;
          if (item?.type === "divider") {
            return (
              <p key={index} className="my-5">
                {item.name}
              </p>
            );
          }

          if (item.subItems) {
            return (
              <SubItems
                key={index}
                item={item}
                openSections={openSections}
                setOpenSections={setOpenSections}
              />
            );
          }

          if (item.name === "WebMail") {
            return (
              <Link
                key={index}
                to="https://internationalscholarsprogram.com/webmail"
                target="_blank"
                className="sidebar-link"
              >
                {item.icon}
                <p>{item.name}</p>
              </Link>
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
