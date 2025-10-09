import React, { useMemo, useState } from "react";
import Modal from "../../../../../../../../components/Modal";
import { InputsWithLabel } from "../../../../../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "@mui/material";
import personalEndpoints from "../../../services/personalEndpoints";
import { toast } from "react-toastify";
import { ModalProps } from "../../../../../../../../types";
import { formatCurrency } from "../../../../../../../../utils/utils";
// ✅ pull in your existing personal hook
import usePersonal from "../../../services/usePersonal";

type Props = ModalProps & { invalidate: () => void };

const SUPP_LOAN_LIMIT = 3000;
const MIN_LOAN = 1;
const currLimit = formatCurrency(SUPP_LOAN_LIMIT);

const SupplementaryLoanApplicationModal: React.FC<Props> = ({
  open,
  toggleModal,
  invalidate,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [showInfo, setShowInfo] = useState(true);
  const [tac, setTac] = useState(false);

  // ✅ get the email/student_id from your personal hook
  const { user } = usePersonal();
  const studentId = user?.email ?? "";

  const amountTooHigh = amount > SUPP_LOAN_LIMIT;
  const amountTooLow = amount !== 0 && amount < MIN_LOAN;
  const amountInvalid = amountTooHigh || amountTooLow;

  const helperText = useMemo(() => {
    if (amountTooHigh) return `Maximum ${currLimit}`;
    if (amountTooLow) return `Minimum ${formatCurrency(MIN_LOAN)}`;
    return `Minimum ${formatCurrency(MIN_LOAN)} • Maximum ${currLimit}`;
  }, [amountTooHigh, amountTooLow]);

  const addLoan = useMutation({
    // ❗ Wrap the 2-arg endpoint so mutationFn has ONE arg (FormData)
    mutationFn: (fd: FormData) => {
      if (!studentId) {
        return Promise.reject(new Error("Missing student ID (email)."));
      }
      // rename to your actual method name if different
      return personalEndpoints.applySupplementary(fd, studentId);
    },
    onSuccess: (response: any) => {
      toast.success(response?.data?.message ?? "Supplementary loan requested.");
      invalidate();
      toggleModal();
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit supplementary loan.";
      toast.error(msg);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!studentId) {
      toast.error("We couldn’t detect your account. Please sign in again.");
      return;
    }
    if (!tac) {
      toast.info("Please accept the terms and conditions first.");
      return;
    }
    if (amountInvalid || amount === 0) {
      toast.info("Please enter a valid loan amount.");
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("loan_amount", String(amount)); // ensure numeric string
    addLoan.mutate(fd);
  };

  return (
    <Modal open={open} setOpen={toggleModal} title="Supplementary Loan Application">
      <div className="modal">
        {showInfo ? (
          <div className="col gap-2 p-3">
            <p>
              Unexpected expenses can arise at any time, and having a financial
              cushion can make all the difference. Our supplementary loan is
              designed to provide additional financial support if your initial
              loan is not sufficient to cover your needs…
            </p>
            <FormFooterBtns onClose={toggleModal} onSubmit={() => setShowInfo(false)} btnText="Continue" />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="col gap-3">
            <InputsWithLabel
              inputLabel="Repayment Period (Months)"
              type="number"
              name="term"
              inputProps={{ min: 1 }}
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
              inputProps={{ min: MIN_LOAN, max: SUPP_LOAN_LIMIT, step: 1 }}
              helperText={helperText}
              error={amountInvalid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = Number(e.target.value);
                setAmount(Number.isFinite(v) ? v : 0);
              }}
            />
            <div className="row items-start mt-5 gap-2">
              <Checkbox id="tac" checked={tac} onChange={(e) => setTac(e.target.checked)} />
              <label htmlFor="tac" className="text-sm cursor-pointer select-none leading-5">
                {termsAndConditions}
              </label>
            </div>
            <FormFooterBtns
              onClose={toggleModal}
              disabled={!tac || amountInvalid || addLoan.isPending || !studentId}
              btnText={addLoan.isPending ? "Requesting..." : "Request Loan"}
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
