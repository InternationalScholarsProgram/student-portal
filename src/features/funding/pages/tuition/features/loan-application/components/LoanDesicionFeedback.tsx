import React, { useEffect, useState } from "react";
import Modal from "../../../../../../../components/Modal";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import RadioBtns from "../../../../../../../components/inputs/RadioBtns";
import FormFooterBtns from "../../../../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import { InputsWithLabel } from "../../../../../../../components/inputs/InputField";
import LoanPortal from "./LoanPortal";
import { formatCurrency } from "../../../../../../../utils/utils";
type Props = {
  schoolDetails: string;
  lender: string;
  amount: number;
};

const LoanDesicionFeedback: React.FC<Props> = ({
  schoolDetails,
  lender,
  amount,
}) => {
  const [gotFeedback, setGotFeedback] = useState("no");
  const [feedback, setFeedback] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFeedback("no");
    setGotFeedback("no");
  }, [open]);

  const toggleModal = () => setOpen(!open);

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFeedback.mutate(feedback);
  };

  const handleFeedback = useMutation({
    mutationFn: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  });
  return (
    <div className="col">
      <LoanPortal userName={"test"} password={"sdfe232@"} link={""} />
      <p>
        You must provide us with the final loan decision feedback before you can
        proceed to the next step. Please provide the loan decision feedback you
        got from the lender
      </p>

      <PrimaryBtn onClick={toggleModal} className="self-end">
        Send Feedback
      </PrimaryBtn>
      <Modal open={open} setOpen={toggleModal} title="Loan Decision Feedback">
        <div className="modal gap-2">
          <div>
            {/* <p>Provide the loan feedback you got from the lender</p> */}
            <p>
              <b>School</b> : {schoolDetails}
            </p>
            <p>
              <b>Lender</b> : {lender}
            </p>
            <p>
              <b>Amount</b> : {formatCurrency(amount)}
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
                    { label: "Yes, I was awarded the loan", value: "yes" },
                    { label: "No, I was denied the loan", value: "no" },
                  ]}
                  name="feedback"
                  onChange={(_e, value) => setFeedback(value)}
                />

                {feedback &&
                  (feedback === "yes" ? acceptedFieds : deniedFieds).map(
                    (field, index) => (
                      <InputsWithLabel key={index} required {...field} />
                    )
                  )}
              </div>
            ) : null}
            <FormFooterBtns
              onClose={toggleModal}
              hideBtn={gotFeedback === "yes" ? false : true}
              btnText={handleFeedback.isPending ? "Submitting..." : "Submit"}
              disabled={!feedback}
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LoanDesicionFeedback;
const acceptedFieds = [
  {
    inputLabel: "Attach approval letter",
    type: "file",
    name: "letter",
  },
  {
    inputLabel: "Amount approved (USD)",
    type: "number",
    name: "amount",
  },
];
const deniedFieds = [
  {
    inputLabel: "Attach denial letter",
    type: "file",
    name: "letter",
  },
  {
    inputLabel: "Reason for denial",
    type: "text",
    rows: 3,
    multiline: true,
    name: "amount",
  },
];
