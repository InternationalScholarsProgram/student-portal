import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import examsEndpoints from "../services/examsEndpoints";
import { errorMsg } from "../../../../components/errors/errorMsg";
import Modal from "../../../../components/Modal";
import {
  InputsWithLabel,
  InputsWithLabelProps,
} from "../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";

type Props = {
  invalidateStatus: () => void;
  enrollmentId: string;
};

const RequestExtraTimeModal = ({ invalidateStatus, enrollmentId }: Props) => {
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => setOpen(!open);
  const book = useMutation({
    mutationFn: examsEndpoints.extraTime,
    onSuccess: () => {
      toast.success("Request sent successfully.");
      invalidateStatus();
      toggleModal();
    },
    onError: (error) => toast.error(errorMsg(error)),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("enrollment_id", enrollmentId);
    book.mutate(formData);
  };

  return (
    <>
      <PrimaryBtn onClick={toggleModal} className="self-end">
        Request Extra Time
      </PrimaryBtn>
      <Modal open={open} setOpen={toggleModal} title="Request Extra Time">
        <form onSubmit={onSubmit} className="modal gap-2">
          {formFields.map((field) => (
            <InputsWithLabel key={field.name} required {...field} />
          ))}
          <FormFooterBtns
            onClose={toggleModal}
            btnText={book.isPending ? "Submitting..." : "Submit Request"}
          />
        </form>
      </Modal>
    </>
  );
};

export default RequestExtraTimeModal;
const formFields: InputsWithLabelProps[] = [
  {
    inputLabel: "Number of days to extend",
    name: "requested_days",
    type: "number",
  },
  {
    inputLabel: "Reason for request",
    name: "reason",
    multiline: true,
    rows: 3,
  },
];
