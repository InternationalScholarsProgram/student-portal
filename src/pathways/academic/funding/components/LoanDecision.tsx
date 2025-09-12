import React from "react";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import RadioBtns from "../../../../components/inputs/RadioBtns";
import ContentComponent from "../../../../components/ContentComponent";
import OfferLetter from "./OfferLetter";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type Props = {
  decision: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    FormData,
    unknown
  >;
  awarded: number;
  children: React.ReactNode;
  loanType: number;
  loanId: string;
};

const LoanDecision: React.FC<Props> = ({
  decision,
  awarded,
  children,
  loanType,
  loanId,
}) => {
  const [response, setResponse] = React.useState<any>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("loan_id", loanId);
    decision.mutate(formData);
  };

  return (
    <>
      <p>
        Congratulations, you have been awarded a loan of USD <b>{awarded}</b>.
        This loan will be disbursed to your US bank account. Download the offer
        letter below, and either choose to accept or reject the loan offer to
        continue with the next steps.
      </p>
      <p>
        View the offer letter :{" "}
        <OfferLetter loan={loanType}>{children}</OfferLetter>
      </p>
      <ContentComponent className="my-4" header="Loan Decision">
        <p>Provide your decision on the loan offer below:</p>
        <div className="alert">
          <p>
            <b>Important:</b> Please read your offer letter thoroughly before
            responding to the loan offer.
          </p>
        </div>
        <form onSubmit={onSubmit} className="p-5 col gap-2">
          <RadioBtns
            className="px-5"
            onChange={(e) => setResponse(e.target.value)}
            title="Select your relocation loan decision"
            options={options}
            name="decision"
          />

          {response === "reject" && (
            <InputsWithLabel
              inputLabel="You are choosing to reject our loan offer. We would like to understand this decision, please provide a reason for the rejection below."
              name="reject_reason"
              placeholder="Reason for rejection"
            />
          )}
          {response !== "" && (
            <FormFooterBtns
              btnText={decision.isPending ? "Submitting..." : "Submit"}
            />
          )}
        </form>
      </ContentComponent>
    </>
  );
};

export default LoanDecision;
const options = [
  { value: "accept", label: "Accept Loan" },
  { value: "reject", label: "Reject Loan" },
];
