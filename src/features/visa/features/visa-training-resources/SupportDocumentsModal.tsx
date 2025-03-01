import { ModalProps } from "../../../../types";
import Modal from "../../../../components/Modal";

function SupportDocumentsModal({ open, toggleModal }: ModalProps) {
  return (
    <Modal open={open} setOpen={toggleModal}>
      <div className="modal"></div>
    </Modal>
  );
}

export default SupportDocumentsModal;
