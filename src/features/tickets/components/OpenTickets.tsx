import { DataGrid, GridRowsProp } from "@mui/x-data-grid";
import { columns } from "./shared";

const rows: GridRowsProp = [
  {
    id: 1,
    category: "test",
    urgency: "test",
    status: "test",
    date: "01/09/333",
  },
  {
    id: 2,
    category: "test",
    urgency: "test",
    status: "test",
    date: "01/09/333",
  },
  {
    id: 3,
    category: "test",
    urgency: "test",
    status: "test",
    date: "01/09/333",
  },
  {
    id: 5,
    category: "test",
    urgency: "test",
    status: "test",
    date: "01/09/333",
  },
  {
    id: 4,
    category: "test",
    urgency: "test",
    status: "test",
    date: "01/09/333",
  },
];

function OpenTickets() {
  return (
    <div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default OpenTickets;
