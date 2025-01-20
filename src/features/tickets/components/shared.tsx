import { GridColDef } from "@mui/x-data-grid"
import PrimaryBorderBtn from "../../../components/buttons/PrimaryBorderBtn";

export const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 90 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 150 },
    { field: "urgency", headerName: "Urgency", minWidth: 150 },
    {
      field: "date",
      headerName: "Date & Time",
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      renderCell: (params) => (
        <div className="col-center w-full h-full py-1 leading-none">
          <PrimaryBorderBtn onClick={() => console.log(params.row)}>
            View
          </PrimaryBorderBtn>
        </div>
      ),
    },
  ];