import { GridColDef } from "@mui/x-data-grid";
import DocsModal from "./DocsModal";
import { SchoolConsentDocument } from "../../../types/types";
import Transcripts from "./transcripts/Transcripts";

export const handleStatus = (params: any) => {
  if (!params) return "Not Uploaded";

  if (typeof params === "string" || typeof params === "number") {
    return getStatus(params);
  }

  if (Array.isArray(params)) {
    if (params.length === 0) return "Not Uploaded";
    if (params.length === 3) {
      return params.map((item: any) => getStatus(item.status)).join(", ");
    }
    return params.map((item: any) => getStatus(item.status));
  }

  return "Invalid Input";
};

export const columns: GridColDef[] = [
  {
    field: "item_name",
    headerName: "Items",
    minWidth: 200,
  },
  {
    field: "uploaded_documents",
    headerName: "Status",
    flex: 1,
    minWidth: 200,
    colSpan: (value, row) => {
      if (row.id === "transcripts") return 2;
      return undefined;
    },
    valueGetter: handleStatus,
    cellClassName: "row-center flex-wrap",
    renderCell: (params) => {
      if (params.row.id === "3") {
        return (
          <div className="py-2">
            {params.row.schools?.map((school: any) => {
              const getSchoolDocStatus = params.row.uploaded_documents?.find(
                (doc: any) => doc?.course?.id === school?.id
              )?.status;
              const status = handleStatus(getSchoolDocStatus);
              return (
                <p key={school?.id} className="text-sm my-1 w-full">
                  {school?.school_name} :
                  <span className={statusClass(status)}>{" " + status}</span>
                </p>
              );
            })}
          </div>
        );
      }
      if (params.row.id === "14") {
        if (!params.row.consents) return null;
        return (
          <div className="py-2">
            {params.row.consents?.map((item: SchoolConsentDocument) => {
              const status = handleStatus(item?.document?.status);
              return (
                <p
                  key={item?.school?.school_id}
                  className="text-sm my-1 w-full"
                >
                  {item?.school?.school_name} :
                  <span className={statusClass(status)}>{" " + status}</span>
                </p>
              );
            })}
          </div>
        );
      }
      if (params.row.id === "transcripts") return <Transcripts />;
      return (
        <p className={statusClass(params.value[0], "text-sm")}>
          {params.value}
        </p>
      );
    },
  },
  {
    field: "action",
    minWidth: 100,
    headerName: "Action",
    headerAlign: "center",
    renderCell: (params) => {
      if (params.row.id === "14" && !params.row.consents) return null;
      return <DocsModal row={params.row} />;
    },
  },
];

export const getStatus = (status: any) => {
  status = parseInt(status);
  if (status === 1) return "Pending";
  if (status === 2) return "Approved";
  if (status === 3) return "Rejected";
  return "Not Uploaded";
};
export const statusClass = (status: any, otherClasses?: string): string => {
  const _status = typeof status === "number" ? getStatus(status) : status;
  let value = "";

  switch (_status) {
    case "Pending":
      value = "text-warning-main";
      break;
    case "Approved":
      value = "text-secondary-main";
      break;
    case "Rejected":
      value = "text-error-main/75";
      break;
    default:
      value = "";
  }

  // Ensure proper concatenation and trimming for empty strings
  return [value, otherClasses].filter(Boolean).join(" ");
};
