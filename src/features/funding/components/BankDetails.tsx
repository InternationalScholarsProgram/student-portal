import ContentComponent from "../../../components/ContentComponent";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import UpdateBankDetailsModal from "./UpdateBankDetailsModal";

const BankDetails = () => {
  return (
    <ContentComponent
      header={
        <p className="row gap-2 py-2">
          <AssuredWorkloadIcon />
          Bank Details
        </p>
      }
    >
      <p>Please update your bank details to be eligible for a loan</p>
      <p>
        To complete the processing of your loan, kindly provide us with your
        bank account information. By providing us with the information, you will
        be agreeing that your banking details will be used for processing the
        disbursement and repayment of the loan borrowed from The International
        Scholars Program via Automated Clearing House (ACH). In case of any
        questions, please do not hesitate to reach out to our team.
      </p>
      <UpdateBankDetailsModal />
    </ContentComponent>
  );
};

export default BankDetails;
