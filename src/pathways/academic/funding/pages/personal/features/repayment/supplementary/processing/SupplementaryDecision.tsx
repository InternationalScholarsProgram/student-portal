// features/processing/supplementary/SupplementaryDecision.tsx
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoanDecision from "../../../../../../components/LoanDecision";
import personalEndpoints from "../../../../services/personalEndpoints"; // ← use personal endpoints
import usePersonal from "../../../../services/usePersonal";
import { errorMsg } from "../../../../../../../../../components/errors/errorMsg";

const SupplementaryDecision = () => {
  const { supplementaryLoan, invalidate, user } = usePersonal();

  const decision = useMutation({
    // Reuse personal endpoints for supplementary too
    mutationFn: (payload: FormData) =>
      personalEndpoints.decision(payload, user?.email ?? ""),
    onSuccess: () => {
      toast.success("Decision submitted successfully.");
      invalidate("status");
    },
    onError: (err) => {
      toast.error(errorMsg(err));
    },
  });

  return (
    <LoanDecision
      decision={decision}
      awarded={Number(supplementaryLoan?.principal) || 0}
      loanType={4} // supplementary
      loanId={supplementaryLoan?.loan_id || ""}
    >
      <p>
        I confirm the approved supplementary loan amount is{" "}
        <b>USD {supplementaryLoan?.principal}</b>. This loan will be finalized
        subject to completion of any remaining checks and requirements.
      </p>
      <p>
        The supplementary loan is intended to bridge costs such as tuition
        top-ups, fees, or short-term living expenses to help you stay on track
        academically.
      </p>
      <p>
        If you need any help before accepting, please contact our team or open a
        support ticket via your member portal.
      </p>
    </LoanDecision>
  );
};

export default SupplementaryDecision;
