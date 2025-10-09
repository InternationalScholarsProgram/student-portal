import React from "react";
import usePersonal from "../../../services/usePersonal";
import SupplementaryLoanApplicationModal from "./SupplementaryLoanApplicationModal";
import { ModalProps } from "../../../../../../../../types";
import RecallDecisions from "./RecallDecisions";
import ContentComponent from "../../../../../../../../components/ContentComponent";

type Props = ModalProps;

const Supplementary: React.FC<Props> = ({ open, toggleModal }) => {
  const {
    supplementaryStatus,
    supplementaryLoan,
    personalLoan,
    invalidate,
  } = usePersonal();

  const invalidateStatus = () => invalidate("status");

  // Prefer supplementary loan id, fall back to personal if needed
  const loanId =
    (supplementaryLoan as any)?.loan_id_sup ??
    (supplementaryLoan as any)?.loan_id ??
    personalLoan?.loan_id;

  switch (supplementaryStatus?.status) {
    case 1:
      return (
        <ContentComponent header="Supplementary Loan Application">
          <RecallDecisions
            invalidate={invalidateStatus}
            status={1}
            loanId={loanId}
          />
        </ContentComponent>
      );

    default:
      return (
        <SupplementaryLoanApplicationModal
          open={open}
          toggleModal={toggleModal}
          invalidate={invalidateStatus}
        />
      );
  }
};

export default Supplementary;
