import { useState } from "react";
import GridTable from "../../../../components/tables/GridTable";
import { columns } from "../../components/utils";
import useTickets from "../../hooks/useTickets";
import ViewTicketModal from "./components/ViewTicketModal";
import { FullLoader } from "../../../../components/loaders/Loader";

function ViewTickets() {
  const { openTickets, closedTickets, isLoading, readNotification } =
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

  const getColumns = () => {
    const _columns = columns(actionView);
    const fieldToExclude = showOpenTickets ? "feedback" : "status";
    return _columns.filter((col) => col.field !== fieldToExclude);
  };

  if (isLoading) return <FullLoader />;
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
