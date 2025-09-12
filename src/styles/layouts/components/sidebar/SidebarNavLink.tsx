import React, { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import useSidebarStore from "./useSidebarStore";

type Props = {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
};

const SidebarNavLink: React.FC<Props> = ({
  to,
  children,
  onClick,
  className,
  style,
}) => {
  // prefer closing the drawer after navigation on small screens
  const closeDrawer = useSidebarStore((s) => s.closeDrawer);
  const handleClick = onClick ?? (() => closeDrawer(true));

  return (
    <NavLink
      to={to}
      style={style}
      className={({ isActive }) =>
        [
          (className && className.trim()) || "sidebar-link",
          isActive ? "active-link" : "",
        ]
          .join(" ")
          .trim()
      }
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
};

export default SidebarNavLink;
