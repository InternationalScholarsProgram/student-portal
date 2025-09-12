import React, { useState } from "react";
import Modal from "../../../../../../../../components/Modal";
import { InputsWithLabel } from "../../../../../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "@mui/material";
import personalEndpoints from "../../../services/personalEndpoints";
import { toast } from "react-toastify";
import { ModalProps } from "../../../../../../../../types";
import { formatCurrency } from "../../../../../../../../utils/utils";

type Props = ModalProps & {
  invalidate: () => void;
};
const SUPP_LOAN_LIMIT = 3000;
const currLimit = formatCurrency(SUPP_LOAN_LIMIT);
const SupplementaryLoanApplicationModal: React.FC<Props> = ({
  open,
  toggleModal,
  invalidate,
}) => {
  const [amount, setAmount] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const [tac, setTac] = useState(false);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    addLoan.mutate(formData);
  };

  const addLoan = useMutation({
    mutationFn: personalEndpoints.appluSupplementary,
    onSuccess: (response) => {
      toast.success(response.data.message);
      invalidate();
      toggleModal();
    },
  });
  return (
    <Modal
      open={open}
      setOpen={toggleModal}
      title="Suppplementary Loan Application"
    >
      <div className="modal">
        {showInfo ? (
          <div className="col gap-2 p-3">
            <p>
              Unexpected expenses can arise at any time, and having a financial
              cushion can make all the difference. Our supplementary loan is
              designed to provide additional financial support if your initial
              loan is not sufficient to cover your needs while studying or
              working in North America. Whether you need extra funds for
              unexpected medical expenses, additional travel requirements, or
              other unforeseen costs, this loan ensures you can manage your
              finances smoothly and without disruptions.
            </p>
            <FormFooterBtns
              onClose={toggleModal}
              onSubmit={() => setShowInfo(false)}
              btnText={"Continue"}
            />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="col gap-3">
            <InputsWithLabel
              inputLabel="Repayment Period (Months)"
              type="number"
              name="term"
            />
            <InputsWithLabel
              inputLabel="Purpose of Loan"
              type="text"
              name="purpose_of_loan"
              rows={3}
              multiline
            />
            <InputsWithLabel
              inputLabel={`Loan Amount (USD, maximum ${currLimit})`}
              type="number"
              name="loan_amount"
              helperText={`Minimum ${currLimit})`}
              error={amount > SUPP_LOAN_LIMIT}
              onChange={(e: any) => setAmount(e.target.value)}
            />
            <div className="row items-start mt-5">
              <Checkbox
                title={termsAndConditions}
                checked={tac}
                onChange={(e) => setTac(e.target.checked)}
              />
              <p
                onClick={() => setTac(!tac)}
                className="text-sm cursor-pointer"
              >
                {termsAndConditions}
              </p>
            </div>

            <FormFooterBtns
              onClose={toggleModal}
              disabled={!tac}
              btnText={addLoan?.isPending ? " Requesting..." : "Request Loan"}
            />
          </form>
        )}
      </div>
    </Modal>
  );
};

export default SupplementaryLoanApplicationModal;
const termsAndConditions =
  " I hereby apply for the loan or credit described in this application. I certify that I made no misrepresentations in this loan application or in any related documents, that all information is true and complete, and that I did not omit any important information. I agree that the lender is authorized to verify with other parties and to make any investigation of my credit, either directly or through any agency employed by the lender for that purpose. The lender may disclose to any other interested parties information as to lender's experiences or transactions with my account.";
