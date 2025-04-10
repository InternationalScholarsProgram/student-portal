import { Chip, ChipProps } from "@mui/material";
import React from "react";
type Props = ChipProps & {
  type: "approved" | "pending" | "rejected";
};

const handleType = (type: string) => {
  switch (type) {
    case "approved":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
      return "error";
    default:
      return "success";
  }
};
const StatusChip: React.FC<Props> = ({ type, ...props }) => {
  return <Chip {...props} color={handleType(type)} />;
};

export default StatusChip;
