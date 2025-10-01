import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { InputsWithLabel } from "../../../../components/inputs/InputField";
import FormFooterBtns from "../../../../components/buttons/FormFooterBtns";
import { InlineLoader } from "../../../../components/loaders/Loader";
import { toast } from "react-toastify";

export type LoanBalancePayload = {
  loan_id: string | number;
  email: string;
  source_table: string;
  total_payable: number;
  total_paid: number;
  remaining_balance: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm?: (payload: { amount: number; loanId: string | number }) => void;
  balance?: LoanBalancePayload | null;
  balanceLoading?: boolean;
  balanceError?: any;
};

const MakePayment: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  balance,
  balanceLoading,
  balanceError,
}) => {
  const [amount, setAmount] = useState<number | "">("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const remaining = Number(balance?.remaining_balance ?? 0);
  const isNumber = typeof amount === "number" && !Number.isNaN(amount);
  const invalid = !isNumber || amount <= 0 || amount > remaining;

  const helper =
    !isNumber
      ? "Enter a valid number"
      : amount <= 0
      ? "Amount must be greater than 0"
      : amount > remaining
      ? `Amount cannot exceed remaining balance (${remaining.toLocaleString()})`
      : "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (invalid) {
      toast.error(helper || "Invalid amount");
      return;
    }
    if (balance) onConfirm?.({ amount: amount as number, loanId: balance.loan_id });
    onClose();
  };

  if (!open) return null;

  const onBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const content = (
    <div
      className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-[1px] flex items-center justify-center p-4"
      onClick={onBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <form
        onSubmit={submit}
        className="modal bg-paper rounded-2xl shadow-2xl outline outline-1 outline-color"
      >
        <div className="row items-center justify-between pb-2 border-b border-white/10">
          <h2 className="title">Make a Payment</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {balanceLoading ? (
          <div className="py-8">
            <InlineLoader />
          </div>
        ) : balanceError || !balance ? (
          <p className="text-error-main py-6">Failed to load balance.</p>
        ) : (
          <>
            <div className="row gap-6 py-2 flex-wrap">
              <div>
                <p className="text-sm text-muted-foreground">Total Payable</p>
                <p className="font-semibold">
                  ${Number(balance.total_payable ?? 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="font-semibold">
                  ${Number(balance.total_paid ?? 0).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining Balance</p>
                <p className="font-semibold">
                  ${Number(remaining).toLocaleString()}
                </p>
              </div>
            </div>

            <InputsWithLabel
              inputLabel="Amount to Pay (USD)"
              type="number"
              name="amount"
              value={amount}
              onChange={(e: any) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              error={Boolean(helper)}
              helperText={helper}
              required
            />

            <div className="pt-2">
              <FormFooterBtns
                btnText="Proceed to Checkout"
                secondaryText="Cancel"
                onSecondary={onClose}
                disabled={invalid}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );

  return createPortal(content, document.body);
};

export default MakePayment;
