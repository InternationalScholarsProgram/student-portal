import Modal from "../../../components/Modal";

type Props = {
  open: boolean;
  selectedTicket: any;
  toggleModal: () => void;
};

function ViewTicketModal({ open, toggleModal, selectedTicket }: Props) {
  return (
    <Modal open={open} setOpen={toggleModal} title="View Ticket">
      <div className="modal">
        <p>{JSON.stringify(selectedTicket)}</p>
      </div>
    </Modal>
  );
}

export default ViewTicketModal;
