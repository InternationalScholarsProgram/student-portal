import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../../../components/Logo";
import { linksWithDivider } from "../../../../router/linkItems";
import SubItems from "./SubItems";
import SidebarNavLink from "./SidebarNavLink";
import useSidebarStore from "./useSidebarStore";

function Sidebar() {
  const location = useLocation();
  const { openSections, setOpenSections, initialize, toggleDrawer } =
    useSidebarStore();

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
                onClick={toggleDrawer}
              >
                {item.icon}
                <p>{item.name}</p>
              </Link>
            );
          }

          return (
            <SidebarNavLink key={index} to={item.to}>
              {item.icon}
              <p>{item.name}</p>
            </SidebarNavLink>
          );
        })}
      </ul>
    </main>
  );
}

export default Sidebar;
