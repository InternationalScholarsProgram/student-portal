// features/repayment/Repayments.tsx
import { useState } from "react";
import { toast } from "react-toastify";

import RepaymentSchedule from "../../../../components/RepaymentSchedule";
import LoanActions from "../../../../components/LoanActions";
import MakePayment from "../../../../components/MakePayment";
import Supplementary from "./supplementary/Supplementary";

import usePersonal from "../../services/usePersonal";
import useFunding from "../../../../services/useFunding";
import { BASE_URL } from "../../../../../../../services/api/base";

const Repayments = () => {
  const [action, setAction] = useState("");
  const { schedulePayments, pastPayments, personalLoan, supplementaryLoan } = usePersonal();
  const { loanBalance, startManualPayment } = useFunding({ loan: personalLoan });

  const onSubmit = (formAction: string) => {
    switch (formAction) {
      case "make_payment":
        return setAction(formAction);
      case "view_loan_contract":
        if (!personalLoan?.loan_contract) {
          toast.error("No contract available to view.");
          return;
        }
        return window.open(`${BASE_URL}${personalLoan.loan_contract}`, "_blank");
      case "apply_loan":
        return setAction(formAction);
      default:
        return;
    }
  };

  const handleConfirmPayment = async ({
    amount,
    loanId,
  }: {
    amount: number;
    loanId: string | number;
  }) => {
    try {
      const payload = await startManualPayment(amount);
      const checkoutUrl = (payload as any)?.checkout_url || (payload as any)?.checkoutUrl;
      if (!checkoutUrl) {
        toast.error("Unable to start payment: missing checkout URL.");
        return;
      }
      window.location.assign(checkoutUrl);
    } catch (e: any) {
      toast.error(e?.message || "Failed to start payment.");
    }
  };

  const options = [
    { value: "make_payment", label: "Make a Loan Payment" },
    { value: "apply_loan", label: "Apply for a Supplementary Loan" },
    { value: "view_loan_contract", label: "View Loan Contract" },
  ].filter((opt) =>
    opt.value !== "apply_loan"
      ? true
      : !supplementaryLoan?.status || supplementaryLoan?.status === 3
  );

  return (
    <div className="col gap-3">
      <Supplementary open={action === "apply_loan"} toggleModal={() => setAction("")} />

      <RepaymentSchedule pastPayments={pastPayments} schedulePayments={schedulePayments} />

      <LoanActions onSubmit={onSubmit} options={options as any} />

      <MakePayment
        open={action === "make_payment"}
        onClose={() => setAction("")}
        onConfirm={handleConfirmPayment}
        balance={loanBalance ?? undefined}
        balanceLoading={false}
        balanceError={undefined}
      />
    </div>
  );
};

export default Repayments;
