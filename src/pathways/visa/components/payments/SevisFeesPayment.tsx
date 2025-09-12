import React, { useState } from "react";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import useVisa from "../../services/hooks/useVisa";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import Modal from "../../../../components/Modal";

function SevisFeesPayment() {
  const { user, inValidateStatus, isMockMarksQualified, requiredMockMarks } =
    useVisa();

  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (user?.country) formData.append("country", user?.country);
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
    <>
      <button className="primary-btn self-end" onClick={toggleModal}>
        Request SEVIS Fee Payment
      </button>
      <Modal
        open={open}
        setOpen={toggleModal}
        title="Request SEVIS fee Payment"
      >
        <div className="modal">
          {isMockMarksQualified ? (
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
                btnText={
                  handlePayment.isPending ? "Processing..." : "Request Payment"
                }
                onClose={toggleModal}
              />
            </form>
          ) : (
            <div>
              <p>
                Regrettably, you didn't achieve {requiredMockMarks}% or higher
                on your mock interview. However, the program will cover your
                SEVIS fee after your real visa interview, once you receive
                positive feedback (whether an approved visa or administrative
                processing) from your country's consulate.
              </p>
              <FormFooterBtns onClose={toggleModal} hideBtn />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
export default SevisFeesPayment;
