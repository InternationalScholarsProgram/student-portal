import React from "react";
import { NavLink } from "react-router-dom";
import useSidebarStore from "./useSidebarStore";
import { useStore } from "zustand";
type Props = { to: string; children: React.ReactNode };

const SidebarNavLink: React.FC<Props> = ({ to, children }) => {
  const { toggleDrawer } = useStore(useSidebarStore);
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active-link" : "")}
      onClick={toggleDrawer}
    >
      {children}
    </NavLink>
  );
};

export default SidebarNavLink;
