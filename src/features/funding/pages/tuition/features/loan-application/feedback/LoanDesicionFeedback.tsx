import React, { useState } from "react";
import Modal from "../../../../../../../components/Modal";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import RadioBtns from "../../../../../../../components/inputs/RadioBtns";
import FormFooterBtns from "../../../../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import { InputsWithLabel } from "../../../../../../../components/inputs/InputField";
import LoanPortal from "../components/LoanPortal";
import { formatCurrency } from "../../../../../../../utils/utils";
import useTuition from "../../../services/useTuition";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import { toast } from "react-toastify";
import ContentComponent from "../../../../../../../components/ContentComponent";

const LoanDesicionFeedback = () => {
  const { activeLoanApplication, schoolAppId, inValidateStatus } = useTuition();
  const [gotFeedback, setGotFeedback] = useState("no");
  const [loanStatus, setLoanStatus] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("app_id", schoolAppId || "");
    formData.append("loan_id", activeLoanApplication?.application_details?.id);
    formData.append("lender", activeLoanApplication?.funding || "");
    formData.append("school", activeLoanApplication?.school || "");
    formData.append(
      "loan_applied",
      activeLoanApplication?.application_details?.loan_amount
    );
    handleFeedback.mutate(formData);
  };

  const handleFeedback = useMutation({
    mutationFn: tuitionEndpoints.loanFeedback,
    onSuccess: () => {
      toggleModal();
      inValidateStatus();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data.message || "An unexpected error occurred."
      );
    },
  });
  return (
    <>
      <ContentComponent header="Loan Decision Feedback" className="col">
        <p>Your loan application is complete</p>
        <LoanPortal userName={"test"} password={"sdfe232@"} link={""} />
        <p>
          Before we can proceed, we kindly request your final loan decision
          feedback.
          <br />
          Please submit your response using the form below.
        </p>

        <PrimaryBtn onClick={toggleModal} className="self-end">
          Submit Feedback
        </PrimaryBtn>
      </ContentComponent>
      <Modal open={open} setOpen={toggleModal} title="Loan Decision Feedback">
        <div className="modal gap-2">
          <div>
            {/* <p>Provide the loan feedback you got from the lender</p> */}
            <p>
              <b>School</b> :{" "}
              {activeLoanApplication?.school +
                " - " +
                activeLoanApplication?.program}
            </p>
          </div>
          <div className="mt-3 px-2">
            <RadioBtns
              title="Have you received a feedback from the lender?"
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              onChange={(_e, value) => setGotFeedback(value)}
              row
            />
          </div>
          <form onSubmit={onsubmit} className="col gap-2">
            {gotFeedback === "yes" ? (
              <div className="px-3">
                <RadioBtns
                  className="ease-in-out duration-300"
                  title="What was the decision you got from the lender? "
                  options={[
                    { label: "Yes, I was awarded the loan", value: "2" },
                    { label: "No, I was denied the loan", value: "3" },
                  ]}
                  name="loan_status"
                  onChange={(_e, value) => setLoanStatus(value)}
                />
                {loanStatus &&
                  (loanStatus === "2" ? acceptedFieds : deniedFieds).map(
                    (field) => <InputsWithLabel key={field.name} {...field} />
                  )}
              </div>
            ) : null}
            <FormFooterBtns
              onClose={toggleModal}
              hideBtn={gotFeedback == "yes" ? false : true}
              btnText={handleFeedback.isPending ? "Submitting..." : "Submit"}
              disabled={!loanStatus}
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default LoanDesicionFeedback;
const acceptedFieds = [
  {
    inputLabel: "Date of decision",
    type: "date",
    name: "approved_on",
    required: true,
  },
  {
    inputLabel: "Upload approval letter",
    type: "file",
    name: "loan_letter",
    required: true,
  },
  {
    inputLabel: "Amount approved (USD)",
    type: "number",
    name: "loan_awarded",
    required: true,
  },
];
const deniedFieds = [
  {
    inputLabel: "Attach denial letter",
    type: "file",
    name: "loan_letter",
    required: true,
  },
  {
    inputLabel: "Reason for denial",
    type: "text",
    rows: 3,
    multiline: true,
    name: "remark",
    required: true,
  },
];
