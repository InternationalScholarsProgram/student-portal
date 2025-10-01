import RepaymentSchedule from "../../../../components/RepaymentSchedule";
import LoanActions from "../../../../components/LoanActions";
import usePersonal from "../../services/usePersonal";
import { useNavigate } from "react-router";
import { useState } from "react";
import { BASE_URL } from "../../../../../../../services/api/base";
import Supplementary from "./supplementary/Supplementary";

const Repayments = () => {
  const [action, setAction] = useState("");
  const { schedulePayments, personalLoan } = usePersonal();
  const navigate = useNavigate();

  const handleActions = (action: string) => {
    switch (action) {
      case "make_payment":
        return navigate("/finances/make-payments", { state: "Test two" });
      case "view_loan_contract":
        return window.open(BASE_URL + personalLoan?.loan_contract, "_blank");
      case "apply_loan":
        return setAction(action);
    }
  };
  return (
    <div>
      <Supplementary
        open={action === "apply_loan"}
        toggleModal={() => setAction("")}
      />
      <RepaymentSchedule schedulePayments={schedulePayments} />
      <LoanActions
        onSubmit={handleActions}
        options={[
          { value: "view_loan_contract", label: "View Loan Contract" },
          { value: "make_payment", label: "Make a Loan Payment" },
          { value: "apply_loan", label: "Apply for a supplementary loan" },
        ]}
      />
    </div>
  );
};

export default Repayments;
