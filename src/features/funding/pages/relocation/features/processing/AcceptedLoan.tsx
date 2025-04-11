import ContentComponent from "../../../../../../components/ContentComponent";
import RelocationContract from "./RelocationContract";

const AcceptedLoan = () => {
  return (
    <ContentComponent header="Accept Relocation Loan Contract">
      <p>
        Thank you for accepting the loan offer. To proceed, the next step is to
        review and sign the official loan contract. This contract outlines the
        terms and conditions of your relocation loan, including repayment
        details and disbursement timeline. Please make sure you read it
        thoroughly before signing.
      </p>
      <RelocationContract />
    </ContentComponent>
  );
};

export default AcceptedLoan;
