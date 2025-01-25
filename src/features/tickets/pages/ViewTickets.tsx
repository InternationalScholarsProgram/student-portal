import { useState } from "react";
import GridTable from "../../../components/tables/GridTable";
import { columns } from "../components/shared";
import useTickets from "../hooks/useTickets";
import ViewTicketModal from "../components/ViewTicketModal";
import PrimaryBorderBtn from "../../../components/buttons/PrimaryBorderBtn";
import { GridColDef } from "@mui/x-data-grid";
import { FullLoader } from "../../../components/loaders/Loader";

function ViewTickets() {
  const { openTickets, openIsLoading, closedTickets } = useTickets();
  const [showOpen, setShowOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const toggleModal = () => setOpenModal(!openModal);
  
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    minWidth: 150,
    renderCell: (params) => (
      <div className="col-center w-full h-full py-1 leading-none">
        <PrimaryBorderBtn
          onClick={() => {
            toggleModal();
            setSelectedTicket(params.row);
          }}
        >
          View
        </PrimaryBorderBtn>
      </div>
    ),
  };
  
  if (openIsLoading) return <FullLoader />;
  return (
    <main>
      <ul className="ul-links w-full">
        <button
          className={showOpen ? "selected" : ""}
          onClick={() => setShowOpen(!showOpen)}
        >
          Open Tickets
        </button>
        <button
          className={!showOpen ? "selected" : ""}
          onClick={() => setShowOpen(!showOpen)}
        >
          Closed Tickets
        </button>
      </ul>
      <section className="col p-3 mx-2">
        <GridTable
          name={showOpen ? "Open Tickets" : "Closed Tickets"}
          rows={showOpen ? openTickets || [] : closedTickets || []}
          columns={[...columns, ...[actionColumn]]}
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
