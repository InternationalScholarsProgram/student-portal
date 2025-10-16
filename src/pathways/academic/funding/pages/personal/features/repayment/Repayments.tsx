// features/repayment/Repayments.tsx
import { useState } from "react";
import { toast } from "react-toastify";

import RepaymentSchedule from "../../../../components/RepaymentSchedule";
import LoanActions from "../../../../components/LoanActions";
import MakePayment from "../../../../components/MakePayment";
import Supplementary, { useSupplementaryUI } from "./supplementary/Supplementary";

import usePersonal from "../../services/usePersonal";
import useFunding from "../../../../services/useFunding";
import { BASE_URL } from "../../../../../../../services/api/base";

const Repayments = () => {
  const [action, setAction] = useState("");
  const { schedulePayments, pastPayments, personalLoan } = usePersonal();
  const { loanBalance, startManualPayment } = useFunding({ loan: personalLoan });
  const { hideApply } = useSupplementaryUI();

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

  const options = [
    { value: "make_payment", label: "Make a Loan Payment" },
    ...(hideApply ? [] : [{ value: "apply_loan", label: "Apply for a Supplementary Loan" }]),
    { value: "view_loan_contract", label: "View Loan Contract" },
  ];

  const handleConfirmPayment = async ({
    amount,
    loanId,
  }: {
    amount: number;
    loanId: string | number;
  }) => {
    try {
      const payload = await startManualPayment(amount);
      const checkoutUrl =
        (payload as any)?.checkout_url || (payload as any)?.checkoutUrl;
      if (!checkoutUrl) {
        toast.error("Unable to start payment: missing checkout URL.");
        return;
      }
      window.location.assign(checkoutUrl);
    } catch (e: any) {
      toast.error(e?.message || "Failed to start payment.");
    }
  };

  // ✅ Proper toggler: honors the boolean from <Supplementary />
  const toggleApplyModal = (open?: boolean) => {
    setAction(open ? "apply_loan" : "");
  };

  return (
    <div className="col gap-3">
      {/* Keep Supplementary always mounted so banners/recall UIs render.
         Modal opens when action === 'apply_loan'. */}
      <Supplementary open={action === "apply_loan"} toggleModal={toggleApplyModal} />

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
