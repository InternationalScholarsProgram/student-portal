import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../../../utils/utils";

const columns: GridColDef[] = [
  { field: "issue", headerName: "Issue", flex: 1, minWidth: 150 },
  // { field: "urgency", headerName: "Urgency", minWidth: 150 },
  {
    field: "ticket_date",
    headerName: "Date & Time",
    minWidth: 150,
    flex: 1,
    valueGetter: (params) => formatDate(new Date(params), "MMM D, YYYY, h:mm A"),
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 150,
    cellClassName: "first-letter:uppercase",
  },
];
const ticketsUrl = "/login/member/dashboard/APIs/tickets/";
const getTicketsUrl =`${ticketsUrl}get_tickets.php?`;

export { ticketsUrl, getTicketsUrl, columns };