import React from "react";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import useVisa from "../../services/hooks/useVisa";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";

function SevisFeesPayment({ toggleModal }: any) {
  const { user, inValidateStatus } = useVisa();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("country", user?.country);
    formData.append("type", "sevis");
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
    <form onSubmit={onSubmit} className="col gap-2">
      <InputsWithLabel
        inputLabel="Sevis Number"
        type="text"
        name="sevisNumber"
        required
      />

      <InputsWithLabel
        inputLabel="Sevis Voucher"
        type="file"
        name="voucher"
        required
      />
      <FormFooterBtns
        btnText={handlePayment.isPending ? "Processing" : "Request Payment"}
        onClose={toggleModal}
      />
    </form>
  );
}
export default SevisFeesPayment;
