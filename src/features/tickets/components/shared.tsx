import { GridColDef } from "@mui/x-data-grid"
import PrimaryBorderBtn from "../../../components/buttons/PrimaryBorderBtn";
import { formatDate } from "../../../utils/utils";

export const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 90 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 150 },
    // { field: "urgency", headerName: "Urgency", minWidth: 150 },
    {
      field: "ticket_date",
      headerName: "Date & Time",
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => formatDate(params, "M/D/YYYY, h:mm A"),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
    },
   
  ];