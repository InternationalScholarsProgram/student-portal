import { Link } from "react-router-dom";
import ContentComponent from "../../../../components/ContentComponent";
import { formatCurrency } from "../../../../utils/utils";

const YourRejectedLoan = ({ toPay = 0 }) => {
  return (
    <ContentComponent header="Loan Offer Rejected">
      <p>
        You have rejected the loan offer presented to you. Please note that this
        means you will be covering the relocation expenses yourself and you have
        to repay your current outstanding balance owed to the program
      </p>
      <p>
        <b>Current Outstanding balance: </b>
        {toPay >= 0
          ? "No outstanding balance"
          : formatCurrency(Math.abs(toPay))}
      </p>

      {toPay < 0 && (
        <Link to="/make-payments" className="self-end primary-btn">
          Complete Payment
        </Link>
      )}
    </ContentComponent>
  );
};

export default YourRejectedLoan;
