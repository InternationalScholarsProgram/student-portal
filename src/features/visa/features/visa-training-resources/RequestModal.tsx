import InputField, {
  InputsWithLabel,
} from "../../../../components/inputs/InputField";
import { ModalProps } from "../../../../types";
import Modal from "../../../../components/Modal";
import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import useVisa from "../../services/hooks/useVisa";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import PickFileButton from "../../../../components/buttons/PickFileButton";

function RequestModal({ open, toggleModal }: ModalProps) {
  const { inValidateStatus } = useVisa();

  const requestTrainingResources = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (!formData.get("visa_interview_date"))
      return alert("Please select a date");
    console.log(formData.get("visa_interview_date"));
    
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
          <div className="card p-1">
            <p className="border-l-4 border-primary-main p-3">
              Please note, you cannot submit a request for visa interview
              training resources if your visa date is more than 21 days from
              today. WARNING, Failure to adhere to this instruction will lead to
              your request being denied and you won't be able to submit this
              request again.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
            <div className="col">
              <label className="">Select your interveiw visa date</label>
              <DatePicker
                minDate={dayjs()}
                maxDate={dayjs().add(3, "week")}
                name="visa_interview_date"
                format="DD-MM-YYYY"
              />
            </div>

            <InputsWithLabel
              inputLabel="Select your interveiw visa time"
              type="time"
              name="visa_time"
              required
            />
          </div>
          <div className="col">
            <label>Upload a screenshot of your visa date</label>
            <PickFileButton text="Upload Image" name="file" accept="image/*" required />
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
