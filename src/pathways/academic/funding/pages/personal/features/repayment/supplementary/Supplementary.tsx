// features/repayment/supplementary/Supplementary.tsx
import React, { useMemo, useState } from "react";
import { ModalProps } from "../../../../../../../../types";
import ContentComponent from "../../../../../../../../components/ContentComponent";
import SupplementaryLoanApplicationModal from "./SupplementaryLoanApplicationModal";
import RecallDecisions from "./RecallDecisions";
import usePersonal from "../../../services/usePersonal";

/** Coerce unknown -> number | undefined */
const toNum = (v: any): number | undefined => {
  if (v === null || v === undefined || v === "null" || v === "") return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
};

export const useSupplementaryUI = () => {
  const { supplementaryUser, supplementaryLoan, personalLoan, invalidate } = usePersonal();

  // ✅ Single source of truth: supplementary_user.status
  const rawUserStatus = supplementaryUser?.status;
  const userStatus = toNum(rawUserStatus);

  // Status meanings (all driven by supplementary_user.status):
  // 1 => Application received (banner)
  // 3 => Rejected (allow resubmit)
  // 4 => Approved (allow recall CTA)
  // 5 => Recall flow (show RecallDecisions)
  // 6 => Recall accepted (banner)
  // 7 => Recall rejected (banner)
  const showBannerReceived  = userStatus === 1;
  const showRejected        = userStatus === 3;
  const showApproved        = userStatus === 4;
  const showRecall          = userStatus === 5;
  const showRecallAccepted  = userStatus === 7;
  const showRecallRejected  = userStatus === 6;

  // Hide Apply when we’re showing the banner or any of the other terminal states
  const hideApply =
    showBannerReceived || showApproved || showRecall || showRecallAccepted || showRecallRejected;

  const loanId =
    (supplementaryLoan as any)?.loan_id_sup ??
    (supplementaryLoan as any)?.loan_id ??
    personalLoan?.loan_id;

  const invalidateStatus = () => invalidate("status");

  return useMemo(
    () => ({
      rawUserStatus,
      userStatus,
      showBannerReceived,
      showRejected,
      showApproved,
      showRecall,
      showRecallAccepted,
      showRecallRejected,
      hideApply,
      loanId,
      invalidateStatus,
    }),
    [
      rawUserStatus,
      userStatus,
      showBannerReceived,
      showRejected,
      showApproved,
      showRecall,
      showRecallAccepted,
      showRecallRejected,
      hideApply,
      loanId,
    ]
  );
};

type Props = ModalProps;

const Supplementary: React.FC<Props> = ({ open, toggleModal }) => {
  const {
    showBannerReceived,
    showRejected,
    showApproved,
    showRecall,
    showRecallAccepted,
    showRecallRejected,
    loanId,
    invalidateStatus,
    hideApply,
  } = useSupplementaryUI();

  const [showRecallUI, setShowRecallUI] = useState(false);

  // 1) Application received (always when supplementary_user.status === 1)
  if (showBannerReceived) {
    return (
      <ContentComponent header="Supplementary Loan Application">
        <div className="p-4 rounded-2xl border bg-blue-50 border-blue-200 text-blue-800 shadow-sm">
          <div className="font-semibold mb-1">Supplementary Application received</div>
          <p className="mb-3">
            We’ve received your supplementary loan application and it’s currently being reviewed.
            You’ll get an update here and via email once a decision is made.
          </p>
        </div>
      </ContentComponent>
    );
  }

  // 3) Rejected — allow resubmit
  if (showRejected) {
    return (
      <ContentComponent header="Supplementary Loan Application">
        <div className="p-4 rounded-2xl border bg-red-50 border-red-200 text-red-800 shadow-sm">
          <div className="font-semibold mb-1">Application Rejected</div>
          <p className="mb-3">
            Your supplementary loan application was not approved. You can update your information and resubmit.
          </p>
          {/* If you want to open the resubmit modal from here, uncomment: */}
          {/* <button type="button" className="primary-btn" onClick={() => toggleModal?.(true)}>
            Resubmit Application
          </button> */}
        </div>

        {open ? (
          <SupplementaryLoanApplicationModal
            open={open}
            toggleModal={toggleModal}
            invalidate={invalidateStatus}
          />
        ) : null}
      </ContentComponent>
    );
  }

  // 4) Approved — optional recall CTA
  if (showApproved) {
    return (
      <ContentComponent header="Supplementary Loan Application">
        <div className="p-4 rounded-2xl border bg-green-50 border-green-200 text-green-800 shadow-sm">
          <div className="font-semibold mb-1">Application Approved</div>
          <p className="mb-3">Congratulations! Your supplementary loan has been approved.</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setShowRecallUI((v) => !v)}
            >
              {showRecallUI ? "Hide Recall Options" : "Request Recall"}
            </button>
          </div>
        </div>

        {showRecallUI ? (
          <div className="mt-3">
            <RecallDecisions invalidate={invalidateStatus} status={4} loanId={loanId} />
          </div>
        ) : null}
      </ContentComponent>
    );
  }

  // 5) Recall in progress
  if (showRecall) {
    return (
      <ContentComponent header="Supplementary Loan Application">
        <RecallDecisions invalidate={invalidateStatus} status={5} loanId={loanId} />
      </ContentComponent>
    );
  }

  // 6) Recall accepted
  if (showRecallAccepted) {
    return (
      <ContentComponent header="Supplementary Loan Application">
        <div className="p-4 rounded-2xl border bg-emerald-50 border-emerald-200 text-emerald-800 shadow-sm">
          <div className="font-semibold mb-1">Recall Accepted</div>
          <p className="mb-3">
            Your recall request has been accepted. Our team will finalize the changes and notify you shortly.
          </p>
          <button type="button" className="secondary-btn" onClick={invalidateStatus}>
            Refresh Status
          </button>
        </div>
      </ContentComponent>
    );
  }

  // 7) Recall rejected
  if (showRecallRejected) {
    return (
      <ContentComponent header="Supplementary Loan Application">
        <div className="p-4 rounded-2xl border bg-amber-50 border-amber-200 text-amber-900 shadow-sm">
          <div className="font-semibold mb-1">Recall Rejected</div>
          <p className="mb-3">
            Your recall request was not approved. If you believe this is an error or your circumstances have changed,
            please contact support or try submitting a new application with updated information.
          </p>
          <div className="flex items-center gap-2">
            <button type="button" className="secondary-btn" onClick={invalidateStatus}>
              Refresh Status
            </button>
            {/* <button type="button" className="primary-btn" onClick={() => toggleModal?.(true)}>
              New Supplementary Application
            </button> */}
          </div>
        </div>

        {open ? (
          <SupplementaryLoanApplicationModal
            open={open}
            toggleModal={toggleModal}
            invalidate={invalidateStatus}
          />
        ) : null}
      </ContentComponent>
    );
  }

  // Default: only open modal when asked
  if (open && !hideApply) {
    return (
      <SupplementaryLoanApplicationModal
        open={open}
        toggleModal={toggleModal}
        invalidate={invalidateStatus}
      />
    );
  }

  return null;
};

export default Supplementary;
