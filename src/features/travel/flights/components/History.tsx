import useFlightHook from "../services/useFlightHook";
import GridTable from "../../../../components/tables/GridTable";
import { GridColDef } from "@mui/x-data-grid";
import Loader from "../../../../components/loaders/Loader";
import { useState } from "react";
import Modal from "../../../../components/Modal";
import BookingMessages from "./BookingMessages";
import OrderHistoryModal from "./OrderHistoryModal";

const History = ({ setShow }: { setShow: any }) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orderHistory } = useFlightHook();
  const viewTableOrders = () => {
    console.log("Back button clicked");
  };
  const columns: GridColDef[] = [
    {
      field: "departure_airport",
      headerName: "Departure",
      flex: 1,
      minWidth: 90,
    },
    {
      field: "destination_airport",
      headerName: "Destination",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <button
          onClick={() => {
            setOpen(true);
            setSelectedOrder({ ...params.row, setShow: setShow });
          }}
          className="primary-border-btn py-1 px-2 cursor-pointer"
        >
          View
        </button>
      ),
    },
  ];
  if (!orderHistory) {
    return <Loader />;
  }
  return (
    <div>
      <div className="p-6">
        <h3 className="text-center text-2xl font-semibold">Order History</h3>
        <div className="w-full min-h-[20vh] col-center">
          {orderHistory ? (
            <GridTable
              sx={{ height: "100%", width: "100%" }}
              columns={columns}
              rows={orderHistory || []}
              getRowId={(row) => JSON.stringify(row)}
              name="Order History"
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
            />
          ) : (
            <Loader />
          )}
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
