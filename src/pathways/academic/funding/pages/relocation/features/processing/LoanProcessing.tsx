import React from "react";
import useRelocation from "../../services/useRelocation";
import Decision from "./Decision";
import BankDetails from "../../../../components/BankDetails";
import AcceptedLoan from "../../../../components/AcceptedLoan";
import RelocationContract from "./RelocationContract";
import ApplicationForm from "../../../../components/ApplicationForm";
import { formatCurrency } from "../../../../../../../utils/utils";

type StatusCardProps = {
  title: string;
  body?: string | React.ReactNode;
  content?: React.ReactNode;
  variant?: "error" | "info";
  className?: string;
  children?: React.ReactNode;
};

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  body,
  content,
  variant = "info",
  className = "",
  children,
}) => {
  const isError = variant === "error";

  const wrapper =
    "rounded-2xl border p-4 md:p-5 shadow-md transition-all hover:shadow-lg backdrop-blur-sm";
  const base =
    "relative overflow-hidden bg-white/90 border-slate-200 dark:border-slate-700";
  const ring = isError
    ? "ring-1 ring-red-100"
    : "ring-1 ring-blue-100";
  const gradient = isError
    ? "bg-gradient-to-br from-red-50 via-white to-white"
    : "bg-gradient-to-br from-blue-50 via-white to-white";
  const titleColor = isError ? "text-red-600" : "text-blue-700";
  const barColor = isError ? "from-red-500 to-rose-400" : "from-blue-600 to-cyan-500";
  const iconColor = isError ? "text-red-500" : "text-blue-600";

  return (
    <div className={`${wrapper} ${base} ${ring} ${gradient} ${className}`}>
      <div
        className={`pointer-events-none absolute -top-6 -right-8 h-24 w-48 rotate-12 bg-gradient-to-r ${barColor} opacity-10 rounded-3xl`}
      />
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${iconColor}`}>
          {/* Icon (no extra lib) */}
          {isError ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-sm">
              <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="16.5" r="1.1" fill="currentColor" />
              <path
                d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3Z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-sm">
              <path d="M12 7v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="16.5" r="1.1" fill="currentColor" />
              <path
                d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3Z"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          )}
        </div>

        <div className="flex-1">
          <h2 className={`text-lg md:text-xl font-semibold ${titleColor}`}>{title}</h2>
          {body && (
            <p className="text-sm md:text-[15px] text-slate-700 mt-1 leading-relaxed">{body}</p>
          )}
        </div>
      </div>

      {/* Rich content slot (lists, extra paragraphs, key-value, etc.) */}
      {content && <div className="mt-3">{content}</div>}

      {/* Optional children (stack any additional UI under the card) */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

const LoanProcessing = () => {
  const { loan, application, invalidate } = useRelocation();
  const maxForReapply = Number(loan?.principal) || 0; // safe ceiling for reapply

  switch (loan?.status) {
    case 1:
      // Decision pending
      return <Decision />;

    case 2:
      // Accepted -> now the user can see/sign the contract
      return (
        <AcceptedLoan>
          <RelocationContract />
        </AcceptedLoan>
      );

    case 3:
      // Rejected but under review — do NOT show the form here
      return (
        <StatusCard
          variant="error"
          title="Loan Declined — Under Review"
          body="Your application was rejected and is currently being reviewed by our team. You don’t need to resubmit anything right now — we’ll notify you once a decision is made."
        />
      );

    case 4:
      // Provide bank details
      return (
        <BankDetails
          loan={{
            member_no: loan?.member_no || "",
            fullnames: loan.fullnames || "",
            phone: loan.phone || "",
            loan_id: loan.loan_id || "",
            loanType: 1,
          }}
          onSuccess={() => invalidate("status")}
        />
      );

    case 5:
      // Rejection recalled by admin — being reviewed
      return (
        <StatusCard
          variant="info"
          title="Admin Recall — In Review"
          body="Your previous rejection has been recalled by the admin team and is being reviewed again. No action is required from you at the moment."
        />
      );

    case 6:
      // Requirements adjusted — MUST accept again first; DO NOT show contract yet
      return (
        <>
          <StatusCard
            variant="info"
            title="Requirements Adjusted"
            body="The admin has adjusted the requirements for your loan. Please accept the updated offer below. The contract will appear after you accept."
          />
          <div className="mt-4">
            <Decision />
          </div>
        </>
      );

    case 7:
      // No adjustments — MUST accept again first; DO NOT show contract yet
      return (
        <>
          <StatusCard
            variant="info"
            title="No Adjustments Made"
            body="To proceed, you need to accept the offer again below. The contract will appear after you accept."
          />
          <div className="mt-4">
            <Decision />
          </div>
        </>
      );

    case 8:
      // Totally rejected — show custom rejection card (with amount) AND the raw re-application form below it
      return (
        <>
          <StatusCard
            variant="error"
            title="Application Rejected"
            content={
              <div className="col gap-2">
                <p>
                  Your loan application has been
                  <span className="text-error-main px-2 font-semibold">rejected</span> by our team.
                </p>

                <p className="px-3">
                  <b>Reason:</b>{" "}
                  <em>{application?.remark || "No specific reason was provided."}</em>
                </p>

                {loan?.to_pay != null && (
                  <p className="px-3">
                    <b>Amount to pay:</b>{" "}
                    <span className="font-semibold">
                      {formatCurrency(Number(loan?.to_pay))}
                    </span>
                  </p>
                )}

                <p>
                  Please review the feedback above and resubmit the form after making the necessary
                  corrections.
                </p>
              </div>
            }
          />

          {/* Re-apply form (raw ApplicationForm) */}
          <div className="mt-4">
            <ApplicationForm max={maxForReapply} loanType={1} onSuccess={() => invalidate("status")} />
          </div>
        </>
      );

    case 9:
      // Rejected contract
      return (
        <StatusCard
          variant="error"
          title="Contract Rejected"
          body="Your contract was rejected. Please check your messages for details. If instructed, you may re-apply or contact support for the next steps."
        />
      );

    default:
      // Fallback: unknown/unsupported status
      return (
        <StatusCard
          variant="info"
          title="Status Update"
          body="We’ve updated your application status. Please check your notifications for more details."
        />
      );
  }
};

export default LoanProcessing;
