import LoanDecision from "../../../../components/LoanDecision";
import { useMutation } from "@tanstack/react-query";
import personalEndpoints from "../../services/personalEndpoints";
import { toast } from "react-toastify";
import { errorMsg } from "../../../../../../../components/errors/errorMsg";
import usePersonal from "../../services/usePersonal";

const Decision = () => {
  const { personalLoan, invalidate } = usePersonal();

  const decision = useMutation({
    mutationFn: personalEndpoints.decision,
    onSuccess: () => {
      toast.success("Decision submitted successfully.");
      invalidate("status");
    },
    onError: (error) => {
      toast.error(errorMsg(error));
    },
  });

  return (
    <LoanDecision
      decision={decision}
      awarded={personalLoan?.principal || 0}
      loanType={1}
      loanId={personalLoan?.loan_id}
    >
      <p>
        I am confirming that the approved loan amount is{" "}
        <b>USD {personalLoan?.principal}</b> This loan will be finalized upon
        verification of your visa approval.{" "}
      </p>
      <p>
        This loan is intended to cover your personal needs, providing you with
        the financial support necessary for any expenses that may arise while
        living in North America. Whether it's for emergencies or other
        unexpected costs, this loan is designed to help you focus on your
        day-to-day needs without worrying about financial constraints.
      </p>
      <p>
        Should you require any further information or assistance, please feel
        free to contact our team or submit a ticket through your member portal.
      </p>
    </LoanDecision>
  );
};

export default Decision;
