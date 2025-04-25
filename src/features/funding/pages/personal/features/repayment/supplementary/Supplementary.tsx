import React from "react";
import usePersonal from "../../../services/usePersonal";
import SupplementaryLoanApplicationModal from "./SupplementaryLoanApplicationModal";
import { ModalProps } from "../../../../../../../types";
import RecallDecisions from "./RecallDecisions";
import ContentComponent from "../../../../../../../components/ContentComponent";

type Props = ModalProps;

const Supplementary: React.FC<Props> = ({ open, toggleModal }) => {
  const { supplementary, invalidate, personalLoan } = usePersonal();
  const invalidateStatus = () => invalidate("status");

  switch (supplementary?.status) {
    case 1:
      return (
        <ContentComponent header="Supplementary Loan Application">
          <RecallDecisions
            invalidate={invalidateStatus}
            status={1}
            loanId={personalLoan?.loan_id}
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

  return <div>Supplementary</div>;
};

export default Supplementary;
