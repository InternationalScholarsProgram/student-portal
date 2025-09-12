import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../../components/Logo";
import { linksWithDivider } from "../../../../router/linkItems";
import SubItems from "./SubItems";
import SidebarNavLink from "./SidebarNavLink";
import useSidebarStore from "./useSidebarStore";

function Sidebar() {
  const location = useLocation();
  const { openSections, setOpenSections, initialize, closeDrawer } =
    useSidebarStore();

  useEffect(() => {
    initialize();
  }, [location.pathname, initialize]);

  return (
    <main className="flex-1 p-3 col">
      <div className="h-[10dvh] col-center">
        <Logo />
      </div>

      <ul className="portal-sidebar-ul h-fit py-3 overflow-y-auto overflow-x-clip">
        {linksWithDivider.map((item: any, index: number) => {
          if (item?.hidden) return null;

          if (item?.type === "divider") {
            return (
              <li key={`divider-${index}`} className="my-5">
                <p>{item.name}</p>
              </li>
            );
          }

          if (item?.subItems?.length) {
            return (
              <SubItems
                key={item.to || item.name || index}
                item={item}
                prefix=""
                depth={0}
                openSections={openSections}
                setOpenSections={setOpenSections}
                onNavigate={() => closeDrawer(true)}   // 👈 always close after navigating
              />
            );
          }

          if (item.name === "WebMail") {
            return (
              <Link
                key={item.to || index}
                to="https://internationalscholarsprogram.com/webmail"
                target="_blank"
                className="sidebar-link"
                onClick={() => closeDrawer(true)}       // 👈 close drawer
                rel="noreferrer"
              >
                {item.icon}
                <p>{item.name}</p>
              </Link>
            );
          }

          return (
            <SidebarNavLink
              key={item.to || index}
              to={item.to}
              onClick={() => closeDrawer(true)}          // 👈 close drawer
            >
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
