import React from "react";
import Modal from "../../../../components/Modal";
import { ModalProps } from "../../../../types";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import useVisa from "../../services/hooks/useVisa";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";

function VisaPaymentModal({ open, toggleModal }: ModalProps) {
  const { user, inValidateStatus } = useVisa();
  const formFields =
    user?.country === "kenya" ? kenyaFormFields : othersFormFields;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("country", user?.country || "");
    formData.append("type", "visa");
    handlePayment.mutate(formData);
  };

  const handlePayment = useMutation({
    mutationFn: visaEndpoints.payments,
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(response.data.message);
        inValidateStatus();
        toggleModal();
      }
    },
  });
  return (
    <Modal open={open} setOpen={toggleModal} title="Request For Visa Payment">
      <form onSubmit={onSubmit} className="modal col gap-2">
        {formFields.map((field) => (
          <InputsWithLabel key={field.name} {...field} />
        ))}
        <InputsWithLabel
          inputLabel="Visa Voucher"
          type="file"
          name="voucher"
        />
        <FormFooterBtns
          btnText={handlePayment.isPending ? "Processing..." : "Request Payment"}
          onClose={toggleModal}
        />
      </form>
    </Modal>
  );
}

export default VisaPaymentModal;
const kenyaFormFields = [
  {
    name: "mpesaName",
    type: "text",
    placeholder: "Enter Mpesa Name",
    inputLabel: "Registered Mpesa Name",
    required: true,
  },
  {
    name: "mpesaNumber",
    type: "text",
    inputLabel: "Registered Mpesa Number",
    placeholder: "Enter Mpesa Number",
    required: true,
  },
];
const othersFormFields = [
  {
    name: "accountName",
    type: "text",
    placeholder: "Enter Account Name",
    inputLabel: "Registered Account Name",
    required: true,
  },
  {
    name: "accountNumber",
    type: "text",
    inputLabel: "Registered Account Number",
    placeholder: "Enter Account Number",
    required: true,
  },
];
