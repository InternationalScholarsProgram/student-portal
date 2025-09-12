import { useState } from "react";
import GridTable from "../../../../components/tables/GridTable";
import { columns } from "../../components/utils";
import useTickets from "../../hooks/useTickets";
import ViewTicketModal from "./components/ViewTicketModal";
import { FullLoader } from "../../../../components/loaders/Loader";
import TopTab from "../../../../components/TopTab";

function ViewTickets() {
  const { openTickets, closedTickets, isLoading, readNotification } =
    useTickets();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const toggleModal = () => setOpenModal(!openModal);

  const actionView = (row: any) => {
    setSelectedTicket(row);
    toggleModal();
    if (row.unread_count > 0) readNotification.mutate(row.id);
  };

  const getColumns = () => {
    const _columns = columns(actionView);
    const fieldToExclude = activeTab === tabs[0] ? "feedback" : "status";
    return _columns.filter((col) => col.field !== fieldToExclude);
  };

  if (isLoading) return <FullLoader />;
  return (
    <main>
      <TopTab
        tabs={["Open Tickets", "Closed Tickets"]}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <section className="col p-3 mx-2">
        <GridTable
          name={activeTab === tabs[0] ? "Open Tickets" : "Closed Tickets"}
          rows={activeTab === tabs[0] ? openTickets || [] : closedTickets || []}
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
const tabs = ["Open Tickets", "Closed Tickets"];
