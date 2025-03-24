import { Collapse } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  item: any;
  openSections: any;
  setOpenSections: any;
};

const SubItems: React.FC<Props> = ({ item, openSections, setOpenSections }) => {
  const isOpen = openSections[item.name] || false;
  return (
    <React.Fragment>
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
          <NavLink
            key={subItem.name}
            to={subItem.to}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <p className="first-letter:uppercase">{subItem.name}</p>
          </NavLink>
        ))}
      </Collapse>
    </React.Fragment>
  );
};

export default SubItems;
