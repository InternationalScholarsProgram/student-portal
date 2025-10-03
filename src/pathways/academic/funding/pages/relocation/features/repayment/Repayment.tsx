import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import useRelocation from "../../services/useRelocation";
import ExtraLoan from "./extra-loan/ExtraLoan";
import { BASE_URL } from "../../../../../../../services/api/base";
import RepaymentSchedule from "../../../../components/RepaymentSchedule";
import LoanActions from "../../../../components/LoanActions";
import MakePayment from "../../../../components/MakePayment";

// If your backend has a different endpoint, update this:
const START_MANUAL_PAYMENT_URL = `${BASE_URL}payments/manual/start`;

const Repayment = () => {
  const { schedulePayments, pastPayments, loan, extraLoan } = useRelocation();
  const [action, setAction] = useState("");
  const navigate = useNavigate();

  const onSubmit = (formAction: string) => {
    switch (formAction) {
      case "make_payment":
        return setAction(formAction);
      case "view_loan_contract":
        return window.open(`${BASE_URL + loan?.loan_contract}`, "_blank");
      case "extra_loan":
        return setAction(formAction);
    }
  };

  const startManualPayment = async (amount: number, loanId: string | number) => {
    // Adjust payload/headers to match your API if needed
    const res = await fetch(START_MANUAL_PAYMENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        amount,
        loan_id: loanId,
        loan_type: 1, // relocation
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `Failed to start payment (${res.status})`);
    }

    return res.json();
  };

  const handleConfirmPayment = async ({
    amount,
    loanId,
  }: {
    amount: number;
    loanId: string | number;
  }) => {
    try {
      const payload = await startManualPayment(amount, loanId);
      const checkoutUrl = payload?.checkout_url || payload?.checkoutUrl;
      if (!checkoutUrl) {
        toast.error("Unable to start payment: missing checkout URL.");
        return;
      }
      window.location.assign(checkoutUrl);
    } catch (e: any) {
      toast.error(e?.message || "Failed to start payment.");
    }
  };

  return (
    <div className="col gap-3">
      <ExtraLoan open={action === "extra_loan"} toggleModal={() => setAction("")} />

      <RepaymentSchedule pastPayments={pastPayments} schedulePayments={schedulePayments} />

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

      <MakePayment
        open={action === "make_payment"}
        onClose={() => setAction("")}
        onConfirm={handleConfirmPayment}
        // Balance is intentionally not fetched here anymore
        balance={undefined}
        balanceLoading={false}
        balanceError={undefined}
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
