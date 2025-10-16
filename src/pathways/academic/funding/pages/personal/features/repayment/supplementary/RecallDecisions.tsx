import React from "react";
import ContentComponent from "../../../../../../../../components/ContentComponent";
import RadioBtns from "../../../../../../../../components/inputs/RadioBtns";
import { acceptReject } from "../../../../../../../../utils/constants";
import { InputsWithLabel } from "../../../../../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../../../../../components/buttons/FormFooterBtns";
import { useMutation } from "@tanstack/react-query";
import personalEndpoints from "../../../services/personalEndpoints";
import { toast } from "react-toastify";
import { errorMsg } from "../../../../../../../../components/errors/errorMsg";
import usePersonal from "../../../services/usePersonal";

type Props = {
  status: number;
  loanId?: string;
  invalidate: () => void;
};

const RecallDecisions: React.FC<Props> = ({ status, loanId, invalidate }) => {
  const [decision, setDecision] = React.useState<"" | "accept" | "reject">("");
  const [rejectReason, setRejectReason] = React.useState("");
  const { user } = usePersonal();
  const studentId = user?.email ?? "";

  const decisionMutation = useMutation({
    // Wrap to satisfy MutationFunction<any, FormData> (one variable arg)
    mutationFn: (fd: FormData) => {
      if (!studentId) return Promise.reject(new Error("Missing student ID (email)."));
      return personalEndpoints.recallDecision(fd, studentId);
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message ?? "Decision submitted.");
      invalidate();
    },
    onError: (err) => toast.error(errorMsg(err)),
  });

  const submitDecision = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loanId) {
      toast.error("Loan ID is missing.");
      return;
    }
    if (!decision) {
      toast.info("Please select Accept or Reject.");
      return;
    }
    if (decision === "reject" && !rejectReason.trim()) {
      toast.info("Please provide a reason for declining.");
      return;
    }

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    // Ensure required fields exist (don’t rely solely on browser serialization)
    fd.set("loan_id", loanId);
    fd.set("decision", decision);
    if (decision === "reject") {
      fd.set("reject_reason", rejectReason.trim());
    }

    decisionMutation.mutate(fd);
  };

  // Disable submit if invalid or pending
  const submitDisabled =
    decisionMutation.isPending ||
    !studentId ||
    !loanId ||
    !decision ||
    (decision === "reject" && !rejectReason.trim());

  switch (status) {
    case 1:
      return (
        <>
          <p className="title-sm">Loan Recall Decision Submitted</p>
          <p>
            Thank you for confirming your loan recall <strong>acceptance</strong>.
            Your response has been received, and the consolidated (merged) loan
            request has been forwarded for final approval. We’ll notify you once
            it’s ready for the next step.
          </p>
        </>
      );

    case 2:
      return (
        <>
          <p className="title-sm">Loan Recall Decision Submitted</p>
          <p>
            Thank you for confirming your loan recall <strong>rejection</strong>.
            Your response has been recorded. If you change your mind or have
            questions, please contact support for further assistance.
          </p>
        </>
      );

    default:
      return (
        <>
          <p className="title-sm">Loan Recall Notification</p>
          <p>
            Your previously approved personal loan has been recalled, as it had not
            yet entered the repayment phase. To streamline your financing, it has
            been consolidated with your supplementary loan and will be processed as
            a merged loan. Please review and either accept or decline this update.
          </p><br></br>

          <ContentComponent header="Confirm Your Decision">
            <form className="p-3" onSubmit={submitDecision}>
              <RadioBtns
                className="px-2"
                name="decision"
                options={acceptReject} // expects values: "accept" | "reject"
                onChange={(e) => setDecision(e.target.value as "accept" | "reject")}
                title="Please review your updated loan details carefully before submitting your response."
              />

              {decision === "reject" && (
                <InputsWithLabel
                  inputLabel="Please provide a reason for declining this loan."
                  type="text"
                  multiline
                  rows={4}
                  name="reject_reason"
                  value={rejectReason}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRejectReason(e.target.value)
                  }
                />
              )}

              <FormFooterBtns
                btnText={decisionMutation.isPending ? "Processing..." : "Submit"}
                disabled={submitDisabled}
              />
            </form>
          </ContentComponent>
        </>
      );
  }
};

export default RecallDecisions;
