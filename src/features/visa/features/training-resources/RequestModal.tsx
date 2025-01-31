import { InputsWithLabel } from "../../../../components/inputs/InputField";
import { ModalProps } from "../../../../types";
import Modal from "../../../../components/Modal";
import PickFileButton from "../../../../components/buttons/PickFileButton";
import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";

function RequestModal({ open, toggleModal }: ModalProps) {
  const requestTrainingResources = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    request.mutate(formData);
  };
  const request = useMutation({
    mutationFn: async (data: any) => {
      const response = await visaEndpoints.requestVisaTrainingResources(data);
      return response;
    },
    onSuccess: () => {
      toggleModal();
    },
  });
  return (
    <Modal open={open} setOpen={toggleModal} title="Request Interview Visa">
      <form onSubmit={requestTrainingResources} className="modal">
        <div className="col p-4 gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
            <InputsWithLabel
              inputLabel="Select your interveiw visa time"
              type="date"
              name="date"
            />
            <InputsWithLabel
              inputLabel="Select your interveiw visa time"
              type="time"
              name="time"
            />
          </div>
          <div className="col">
            <label htmlFor="file-input">
              Upload a screenshot of your visa date
            </label>
            <PickFileButton text="Choose file" accept="image/*" name="file" />
          </div>
        </div>
        <div className="row justify-end gap-2 my-3">
          <button className="text-btn" onClick={toggleModal}>Close</button>
          <button className="primary-btn" type="submit">
            {request.isPending ? "Submiting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default RequestModal;
