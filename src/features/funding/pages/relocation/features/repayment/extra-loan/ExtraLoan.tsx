import useRelocation from "../../../services/useRelocation";
import ContentComponent from "../../../../../../../components/ContentComponent";
import ContactSupport from "../../../../../../../components/ContactSupport";
import StatusChip from "../../../../../../../components/StatusChip";
import ExtraLoanModal from "./ExtraLoanModal";
import PaymentStatus from "./PaymentStatus";

const ExtraLoan = ({ open, toggleModal }: any) => {
  const { extraLoan } = useRelocation();
  switch (extraLoan?.status) {
    case 1:
      return (
        <ContentComponent header="Extra Loan Request Under Review">
          <p>
            You have successfully requested an extra loan of{" "}
            <strong>${extraLoan?.amount}</strong> .
          </p>
          <ContactSupport />
        </ContentComponent>
      );
    case 2:
      return <PaymentStatus extraLoan={extraLoan} />;
    case 3:
      return (
        <>
          <p>
            Your requested extra loan of <strong>${extraLoan?.amount}</strong> .
            has been <StatusChip type="rejected" />.
          </p>
          <p className="px-2">
            Reason : <em>{extraLoan?.remark || "No details provided."}</em>
          </p>
          <p>Please work on the reason and resubmit.</p>
          <ExtraLoanModal open={open} toggleModal={toggleModal} />
        </>
      );
    default:
      return <ExtraLoanModal open={open} toggleModal={toggleModal} />;
  }
};

export default ExtraLoan;
