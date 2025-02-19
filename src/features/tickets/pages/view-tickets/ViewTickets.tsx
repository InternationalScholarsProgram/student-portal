import { useState } from "react";
import GridTable from "../../../../components/tables/GridTable";
import { feedbackCol, columns } from "../../components/utils";
import useTickets from "../../hooks/useTickets";
import ViewTicketModal from "./components/ViewTicketModal";
import { GridColDef } from "@mui/x-data-grid";
import { FullLoader } from "../../../../components/loaders/Loader";
import { Badge } from "@mui/material";

function ViewTickets() {
  const { openTickets, isLoading, closedTickets, readNotification } =
    useTickets();
  const [showOpenTickets, setShowOpenTickets] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});

  const toggleModal = () => setOpenModal(!openModal);
  const toggleTickets = () => setShowOpenTickets(!showOpenTickets);
  const actionView = (row: any) => {
    setSelectedTicket(row);
    toggleModal();
    if (row.unread_count > 0) readNotification.mutate(row.id);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    cellClassName: "row-center",
    renderCell: (params) => (
      <div className="col-center flex-1">
        <Badge color="primary" badgeContent={params.row.unread_count}>
          <p className="table-btn" onClick={() => actionView(params.row)}>
            View
          </p>
        </Badge>
      </div>
    ),
  };

  if (isLoading) return <FullLoader />;
  const getColumns = () => {
    if (showOpenTickets) return [...columns, actionColumn];
    return [...columns, feedbackCol, actionColumn];
  };

  return (
    <main>
      <ul className="ul-links w-full">
        <button
          className={showOpenTickets ? "selected" : ""}
          onClick={toggleTickets}
        >
          Open Tickets
        </button>
        <button
          className={!showOpenTickets ? "selected" : ""}
          onClick={toggleTickets}
        >
          Closed Tickets
        </button>
      </ul>
      <section className="col p-3 mx-2">
        <GridTable
          name={showOpenTickets ? "Open Tickets" : "Closed Tickets"}
          rows={showOpenTickets ? openTickets || [] : closedTickets || []}
          columns={getColumns()}
        />
      </section>
      <ViewTicketModal
        open={openModal}
        toggleModal={toggleModal}
        selectedTicket={selectedTicket}
      />
    </main>
  );
}

export default ViewTickets;
