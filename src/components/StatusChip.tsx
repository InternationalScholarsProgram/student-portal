import { Chip, ChipProps } from "@mui/material";
import React from "react";
type Props = ChipProps & {
  type: "approved" | "pending" | "rejected";
};

const StatusChip: React.FC<Props> = ({ type, ...props }) => {
  return (
    // <Chip
    //   {...props}
    //   color={handleType(type)}
    //   label={props?.label ? props?.label : type}
    // />
    <div className="row-center flex-1 h-full w-full">
      <div className={`${handleType(type)} `}>
        <p>{props?.label ? props?.label : type}</p>
      </div>
    </div>
  );
};

export default StatusChip;

export const handleType = (type: string) => {
  const defaultClasses = "/35 rounded-xl w-fit py-1 px-2 my-1";
  const bgClasses: Record<string, string> = {
    approved: "bg-dark-secondary-main",
    paid: "bg-dark-secondary-main",
    pending: "bg-dark-warning-main",
    rejected: "bg-dark-error-main",
    "not paid": "bg-dark-error-main/20 ",
  };

  return (bgClasses[type?.toLowerCase()] || "bg-dark-secondary-main") + defaultClasses;
};

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
