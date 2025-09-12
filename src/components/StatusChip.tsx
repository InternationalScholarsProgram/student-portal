import { ChipProps } from "@mui/material";
import React from "react";
type Props = ChipProps & {
  type: "approved" | "pending" | "rejected" | "paid" | "not paid";
};

const StatusChip: React.FC<Props> = ({ type, ...props }) => {
  return (
    <span className={handleType(type)}>
      {props?.label ? props?.label : type}
    </span>
  );
};


const handleType = (type: string) => {
  const defaultClasses = " rounded-xl w-fit py-1 px-2 my-1";
  const bgClasses: Record<string, string> = {
    approved: "bg-dark-secondary-main/30",
    paid: "bg-dark-secondary-main/30",
    pending: "bg-dark-warning-main/30",
    rejected: "bg-dark-error-main/30",
    "not paid": "bg-dark-error-main/30",
  };
  
  return (
    (bgClasses[type?.toLowerCase()] || "bg-dark-secondary-main") +
    defaultClasses
  );
};

export default StatusChip;
export { handleType };

// const handleType = (type: string) => {
//   switch (type?.toLowerCase()) {
//     case "approved":
//     case "paid":
//       return "success";
//     case "pending":
//       return "warning";
//     case "rejected":
//     case "not paid":
//       return "error";
//     default:
//       return "success";
//   }
// };
