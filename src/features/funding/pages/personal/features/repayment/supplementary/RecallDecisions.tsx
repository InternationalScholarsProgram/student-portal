import React from "react";
import ContentComponent from "../../../../../../../components/ContentComponent";
import RadioBtns from "../../../../../../../components/inputs/RadioBtns";
import { acceptReject } from "../../../../../../../utils/constants";
import { InputsWithLabel } from "../../../../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import personalEndpoints from "../../../services/personalEndpoints";
import { toast } from "react-toastify";
import { errorMsg } from "../../../../../../../components/errors/errorMsg";

type Props = {
  status: number;
  loanId: string;
  invalidate: () => void;
};

const RecallDecisions: React.FC<Props> = ({ status, loanId, invalidate }) => {
  const [decision, setDecision] = React.useState<string>("");

  const submitDecision = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("loan_id", loanId);
    decisionMutation.mutate(formData);
  };
  const decisionMutation = useMutation({
    mutationFn: personalEndpoints.recallDecision,
    onSuccess: (response) => {
      toast.success(response.data.message);
      invalidate();
    },
    onError: (error) => toast.error(errorMsg(error)),
  });

  switch (status) {
    case 1:
      return (
        <>
          <p className="title-sm">Loan Recall Decision Submitted</p>
          <p>
            Thank you for confirming your loan recall Rejection decision. Your
            response has been successfully received, and the consolidated loan
            request has been forwarded for final approval. Please allow some
            time as our team completes the necessary reviews. You will be
            notified once it's ready for the next step.
          </p>
        </>
      );
    case 2:
      return (
        <>
          <p className="title-sm">Loan Recall Decision Submitted</p>
          <p>
            Thank you for confirming your loan recall Rejection decision. Your
            response has been successfully received, and the consolidated loan
            request has been forwarded for final approval. Please allow some
            time as our team completes the necessary reviews. You will be
            notified once it's ready for the next step.
          </p>
        </>
      );

    default:
      return (
        <>
          <p className="title-sm">Loan Recall Notification</p>
          <p>
            Your previously approved personal loan has been recalled, as it had
            not yet entered the repayment phase. To streamline your financing,
            this loan has now been consolidated with your supplementary loan and
            will be processed as a merged loan. To proceed, you are required to
            either accept or decline this updated loan recall decision.
          </p>
          <ContentComponent header>
            <form className="p-3" onSubmit={submitDecision}>
              <RadioBtns
                className="px-2"
                name="decision"
                options={acceptReject}
                onChange={(e) => setDecision(e.target.value)}
                title="Please review your updated loan details carefully before submitting your response."
              />
              {decision === "reject" && (
                <InputsWithLabel
                  inputLabel="Please provide a reason for declining this loan."
                  type="text"
                  multiline
                  rows={4}
                  name="reject_reason"
                />
              )}
              <FormFooterBtns
                btnText={
                  decisionMutation.isPending ? "Processing..." : "Submit"
                }
              />
            </form>
          </ContentComponent>
        </>
      );
  }
};

export default RecallDecisions;
