import Modal from "../../../../components/Modal";
import useVisa from "../../services/hooks/useVisa";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { CounterModal } from "../../types/visaTypes";

function TrainingVideosModal({
  open,
  toggleModal,
  updateCounter,
}: CounterModal) {
  const { visa } = useVisa();
  return (
    <Modal title="Training Videos" open={open} setOpen={toggleModal}>
      <div className="modal">
        {visa.transcript_counter ? (
          <p>
            You have {visa.transcript_counter} visa interview transcripts left
            to view. Please note you will only be allowed to read each Visa
            Transcript once. Do you want to continue?
          </p>
        ) : (
          <p>You have read all the available visa interview transcripts</p>
        )}
        <div>
          <p>Visa Outcome: Approved</p>
          <p>
            <b>High School Grade:</b>
          </p>
        </div>
        <FormFooterBtns
          onClose={toggleModal}
          btnText={updateCounter.isPending ? "Loading..." : "Continue"}
          onSubmit={() => updateCounter.mutate("videos")}
        />
      </div>
    </Modal>
  );
}

export default TrainingVideosModal;
