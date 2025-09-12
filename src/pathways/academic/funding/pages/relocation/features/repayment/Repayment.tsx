import { useState } from "react";
import { useNavigate } from "react-router";

import useRelocation from "../../services/useRelocation";
import ExtraLoan from "./extra-loan/ExtraLoan";
import { BASE_URL } from "../../../../../../../services/api/base";
import RepaymentSchedule from "../../../../components/RepaymentSchedule";
import LoanActions from "../../../../components/LoanActions";

const Repayment = () => {
  const { schedulePayments, loan, extraLoan } = useRelocation();
  const [action, setAction] = useState("");
  const navigate = useNavigate();

  const onSubmit = (formAction: string) => {
    if (formAction === "make_payment")
      navigate("/make-payments", { state: "Test two" });
    if (formAction === "view_loan_contract")
      window.open(`${BASE_URL + loan?.loan_contract}`, "_blank");
    if (formAction === "extra_loan") setAction(formAction);
  };

  return (
    <div className="col gap-3">
      <ExtraLoan
        open={action === "extra_loan"}
        toggleModal={() => setAction("")}
      />
      <RepaymentSchedule schedulePayments={schedulePayments} />

      <LoanActions
        onSubmit={onSubmit}
        options={options.filter((option) => {
          if (option.value === "extra_loan") {
            if (!extraLoan?.status || extraLoan?.status === 3) return true;
            return false;
          }
          return true;
        })}
      />
    </div>
  );
};

export default Repayment;
const options = [
  { value: "make_payment", label: "Make a Loan Payment" },
  { value: "extra_loan", label: "Request an Extra Loan" },
  { value: "view_loan_contract", label: "View Loan Contract" },
];
