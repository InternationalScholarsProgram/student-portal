import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useRelocation from "../../services/useRelocation";
import relocationApis from "../../services/relocationApis";
import LoanDecision from "../../../../components/LoanDecision";

const Decision = () => {
  const { relocationStatus, invalidate } = useRelocation();
  const decision = useMutation({
    mutationFn: relocationApis.decision,
    onSuccess: () => {
      toast.success("Decision submitted successfully.");
      invalidate("status");
    },
  });

  return (
    <LoanDecision
      decision={decision}
      awarded={relocationStatus?.loan?.principal || 0}
      loanType={1}
    >
      <p>
        I am confirming that the approved loan amount is{" "}
        <b>USD {relocationStatus?.loan?.principal}</b> This loan will be
        finalized upon verification of your visa approval.{" "}
      </p>
      <p>
        The loan covers all the expenses that you incurred in the relocation
        process to America, less the amount you contributed to the program. Any
        pocket money available after deducting all the expenses will be
        disbursed directly to your US bank account. Should you require any
        further information, please feel free to contact our team or submit a
        ticket through your student portal.
      </p>
    </LoanDecision>
  );
};

export default Decision;
