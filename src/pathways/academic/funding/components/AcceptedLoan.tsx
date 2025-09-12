import { ReactNode } from "react";
import ContentComponent from "../../../../components/ContentComponent";

const AcceptedLoan: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ContentComponent header="Loan Contract">
      <p>
        Thank you for accepting the loan offer. To proceed, the next step is to
        review and sign the official loan contract. This contract outlines the
        terms and conditions of your relocation loan, including repayment
        details and disbursement timeline. Please make sure you read it
        thoroughly before signing.
      </p>
      {children}
    </ContentComponent>
  );
};

export default AcceptedLoan;
