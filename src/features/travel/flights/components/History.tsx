import useFlightHook from "../services/useFlightHook";
import GridTable from "../../../../components/tables/GridTable";
import { GridColDef } from "@mui/x-data-grid";
import Loader from "../../../../components/loaders/Loader";
import { useState } from "react";
import Modal from "../../../../components/Modal";
import BookingMessages from "./BookingMessages";
import OrderHistoryModal from "./OrderHistoryModal";
import { formatDate } from "../../../../utils/utils";

const History = ({ setShow }: { setShow: any }) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orderHistory } = useFlightHook();

  const columns: GridColDef[] = [
    {
      field: "departure_time",
      headerName: "Departure Time",
      valueGetter: (params: any) =>
        formatDate(params?.replace("TANYT", ""), "MMM D, YYYY"),
      minWidth: 150,
    },
    {
      field: "departure_airport",
      headerName: "Departure",
      minWidth: 100,
    },

    {
      field: "destination_airport",
      headerName: "Destination",
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      cellClassName: "row-center",
      renderCell: (params) => (
        <p
          className={
            params.value === "Booked"
              ? "text-secondary-main"
              : params.value === "Rejected"
              ? "text-error-main"
              : ""
          }
        >
          {params.value}
        </p>
      ),
    },
    {
      field: "",
      headerName: "Action",
      minWidth: 100,
      renderCell: (params) => (
        <div className="col-center h-full w-full">
          <button
            onClick={() => {
              console.log(params.row);
              setOpen(true);
              setSelectedOrder({ ...params.row, setShow: setShow });
            }}
            className="primary-border-btn"
          >
            View
          </button>
        </div>
      ),
    },
  ];
  if (!orderHistory) {
    return <Loader />;
  }
  return (
    <div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold opacity-75">
          Your Order History
        </h3>
        <div className="w-full min-h-[20vh] col-center overfl">
          <GridTable
            columns={columns}
            rows={orderHistory}
            getRowId={(row) => JSON.stringify(row)}
            name="Order History"
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          />
        </div>
      </div>
      <OrderHistoryModal
        open={open}
        setOpen={setOpen}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};

export default History;
