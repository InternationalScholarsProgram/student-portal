import { IconButton, Tooltip } from "@mui/material";
import React from "react";
interface Props extends React.ComponentProps<typeof IconButton> {
  title: string;
  children: React.ReactNode;
}

function ToolTip({ title, children, ...props }: Props) {
  return (
    <Tooltip className="border-30" title={title}>
      <IconButton {...props}>{children}</IconButton>
    </Tooltip>
  );
}

export default ToolTip;
