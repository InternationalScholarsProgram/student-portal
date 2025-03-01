import Modal from "../../../../components/Modal";
import { CounterModal } from "../../types/visaTypes";

function InterviewTranscriptsModal({ open, toggleModal }: CounterModal) {
  return (
    <Modal open={open} setOpen={toggleModal}>
      <div className="modal"></div>
    </Modal>
  );
}

export default InterviewTranscriptsModal;
