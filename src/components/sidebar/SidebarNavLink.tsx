import React from "react";
import { NavLink } from "react-router-dom";
import sideBarStore from "./sideBarStore";
import { useStore } from "zustand";

const SidebarNavLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  const { toggleDrawer } = useStore(sideBarStore);
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
