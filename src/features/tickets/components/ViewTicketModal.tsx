import PickFileButton from "../../../components/buttons/PickFileButton";
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
        <p>Category : {selectedTicket?.category}</p>
        <p>Issue : {selectedTicket?.issue}</p>
        <p>Status : {selectedTicket?.status}</p>
        <PickFileButton
          file={selectedTicket?.screenshot}
          text="View Screenshot"
        />
        <div className="chat">
          <p>{selectedTicket?.message}</p>
          
        </div>
      </div>
    </Modal>
  );
}

export default ViewTicketModal;
