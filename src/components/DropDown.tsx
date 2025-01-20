import React, { useState } from "react";
import { Menu } from "@mui/material";

interface DropDownProps {
  buttonClassName?: string;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  preventDefault?: boolean;
  close?: any;
}

const DropDown = ({
  buttonClassName,
  title,
  children,
  preventDefault,
  close,
}: DropDownProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleButtonClick = (e: any) => setAnchorEl(e?.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleOnclickMenu = () => {
    if (!preventDefault) handleMenuClose();
  };

  React.useEffect(() => {
    if (close) {
      handleMenuClose();
    }
  }, [close]);

  return (
    <>
      <button className={buttonClassName} onClick={handleButtonClick}>
        {title}
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClick={handleOnclickMenu}
      >
        {children}
      </Menu>
    </>
  );
};

export default DropDown;
