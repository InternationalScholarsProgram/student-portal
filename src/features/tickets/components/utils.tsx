import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../../../utils/utils";

const columns: GridColDef[] = [
  { field: "category", headerName: "Category", flex: 1, minWidth: 150 },
  { field: "issue", headerName: "Issue", flex: 1, minWidth: 150 },
  {
    field: "ticket_date",
    headerName: "Date & Time",
    minWidth: 150,
    flex: 1,
    valueGetter: (params) =>
      formatDate(new Date(params), "MMM D, YYYY, h:mm A"),
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 120,
    cellClassName: "first-letter:uppercase",
  },
];
const feedbackCol: GridColDef = {
  field: "feedback",
  headerName: "Feedback",
  minWidth: 150,
  flex: 1,
};
const ticketsUrl = "/login/member/dashboard/APIs/tickets/";
const getTicketsUrl = `${ticketsUrl}get_tickets.php?`;

export { ticketsUrl, getTicketsUrl, columns, feedbackCol };
