import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoanDecision from "../../../../components/LoanDecision";
import personalEndpoints from "../../services/personalEndpoints";
import usePersonal from "../../services/usePersonal";
import { errorMsg } from "../../../../../../../components/errors/errorMsg";

const Decision = () => {
  const { personalLoan, invalidate, user } = usePersonal();

  const decision = useMutation({
    // personalEndpoints.decision expects (payload, studentId)
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
      awarded={Number(personalLoan?.principal) || 0}
      loanType={2} // personal
      loanId={personalLoan?.loan_id || ""}
    >
      <p>
        I am confirming that the approved loan amount is{" "}
        <b>USD {personalLoan?.principal}</b>. This loan will be finalized upon
        verification of your visa approval.
      </p>
      <p>
        This personal loan is intended to support your day-to-day needs and
        unexpected expenses while living in North America, so you can focus on
        your goals without financial strain.
      </p>
      <p>
        If you need further information or assistance, please contact our team
        or submit a ticket through your member portal.
      </p>
    </LoanDecision>
  );
};

export default Decision;
