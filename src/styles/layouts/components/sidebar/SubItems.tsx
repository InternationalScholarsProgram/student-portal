import { Collapse } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SidebarNavLink from "./SidebarNavLink";

type Props = {
  item: any;
  openSections: any;
  setOpenSections: any;
};

const SubItems: React.FC<Props> = ({ item, openSections, setOpenSections }) => {
  const isOpen = openSections[item.name] || false;
  return (
    <li className="col ">
      <button
        onClick={() => setOpenSections(item.name)}
        className="sidebar-link"
      >
        {item.icon}
        <p className="text-left flex-1">{item.name}</p>
        {isOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
      </button>
      <Collapse
        in={isOpen}
        timeout="auto"
        unmountOnExit
        className="pl-[10%] opacity-80"
      >
        {item.subItems.map((subItem: any) => (
          <SidebarNavLink key={subItem.name} to={`/${item.to}/${subItem.to}`}>
            <p className="first-letter:uppercase">{subItem.name}</p>
          </SidebarNavLink>
        ))}
      </Collapse>
    </li>
  );
};

export default SubItems;
