import { InputsWithLabel } from "../../../../components/inputs/InputField";
import { ModalProps } from "../../../../types";
import Modal from "../../../../components/Modal";
import PickFileButton from "../../../../components/buttons/PickFileButton";
import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import useVisa from "../../services/hooks/useVisa";

function RequestModal({ open, toggleModal }: ModalProps) {
  const { inValidateStatus } = useVisa();
  const requestTrainingResources = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    request.mutate(formData);
  };
  const request = useMutation({
    mutationFn: visaEndpoints.requestVisaTrainingResources,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(response.data?.message);
        inValidateStatus();
        toggleModal();
      }
    },
  });
  return (
    <Modal
      open={open}
      setOpen={toggleModal}
      title="Request Visa Training Resources"
    >
      <form onSubmit={requestTrainingResources} className="modal">
        <div className="col p-4 gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
            <InputsWithLabel
              inputLabel="Select your interveiw visa date"
              type="date"
              name="visa_interview_date"
              required
            />
            <InputsWithLabel
              inputLabel="Select your interveiw visa time"
              type="time"
              name="visa_time"
              required
            />
          </div>
          <div className="col">
            <label htmlFor="file-input">
              Upload a screenshot of your visa date
            </label>
            <PickFileButton
              required
              text="Choose file"
              accept="image/*"
              name="file"
            />
          </div>
        </div>
        <div className="row justify-end gap-2 my-3">
          <button className="text-btn" onClick={toggleModal}>
            Close
          </button>
          <button className="primary-btn" type="submit">
            {request.isPending ? "Submiting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default RequestModal;
