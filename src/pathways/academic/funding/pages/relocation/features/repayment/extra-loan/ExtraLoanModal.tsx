import { useMutation } from "@tanstack/react-query";
import useRelocation from "../../../services/useRelocation";
import relocationApis from "../../../services/relocationApis";
import { toast } from "react-toastify";
import { errorMsg } from "../../../../../../../../components/errors/errorMsg";
import Modal from "../../../../../../../../components/Modal";
import { ModalProps } from "../../../../../../../../types";
import { InputsWithLabel } from "../../../../../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../../../../../components/buttons/FormFooterBtns";

const ExtraLoanModal = ({ open, toggleModal }: ModalProps) => {
    const { application, invalidate } = useRelocation();
    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      formData.append("customer_id", application?.customer_id || "");
      addExtraLoan.mutate(formData);
    };
    const addExtraLoan = useMutation({
      mutationFn: relocationApis.addExtraLoan,
      onSuccess: () => {
        toast.success("Extra loan successfully requested.");
        toggleModal();
        invalidate("status");
      },
      onError: (error: any) => {
        toast.error(errorMsg(error));
      },
    });
    return (
      <Modal open={open} setOpen={toggleModal} title="Extra Loan Application">
        <form onSubmit={onSubmit} className="modal col gap-3">
          <div className="alert">
            <p>
              Kindly note: This amount is to be repaid within a month from the day
              it is approved. The amount will be deducted automatically from your
              account.
            </p>
          </div>
          <InputsWithLabel inputLabel="Select Date" type="date" name="date" />
          <InputsWithLabel
            inputLabel="Enter Amount"
            type="number"
            name="amount"
          />
          <FormFooterBtns
            onClose={toggleModal}
            btnText={addExtraLoan?.isPending ? " Requesting..." : "Request Loan"}
          />
        </form>
      </Modal>
    );
  };
  export default ExtraLoanModal;