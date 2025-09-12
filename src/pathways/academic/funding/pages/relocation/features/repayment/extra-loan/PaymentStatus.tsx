import React from "react";
import { Status } from "../../../types/relocationTypes";
import ContentComponent from "../../../../../../../../components/ContentComponent";
import StatusChip from "../../../../../../../../components/StatusChip";
import {
  formatCurrency,
  formatDate,
  splitDate,
} from "../../../../../../../../utils/utils";
import ContactSupport from "../../../../../../../../components/ContactSupport";
type Props = { extraLoan: Status["extra_loan"] };

const PaymentStatus: React.FC<Props> = ({ extraLoan }) => {
  if (new Date() > splitDate(extraLoan?.due_date)) {
    return (
      <ContentComponent header="Extra Loan Payment">
        <p>
          Your loan payment of <b>{formatCurrency(extraLoan?.amount)}</b> now
          due. Please ensure that your account has sufficient funds to complete
          the payment.
        </p>
        <ContactSupport />
      </ContentComponent>
    );
  }
  switch (extraLoan?.remark) {
    case "succeeded":
      return (
        <ContentComponent header="Extra Loan Request Approved">
          <p>
            We're happy to let you know that your extra loan request has been{" "}
            <StatusChip type="paid" /> for{" "}
            <b>{formatCurrency(extraLoan?.amount)}</b>.
          </p>
          <ContactSupport />
        </ContentComponent>
      );

    case "Payment Failed":
      return (
        <ContentComponent header="Extra Loan Request Approved">
          <p>
            The payment attempt was unsuccessful. Please check your email for
            more details.
          </p>
          {extraLoan?.invoice_url && (
            <p>
              You can complete the payment using the following link:{" "}
              <a href={extraLoan?.invoice_url} target="_blank">
                {extraLoan?.invoice_url}
              </a>
            </p>
          )}
          <ContactSupport />
        </ContentComponent>
      );

    default:
      return (
        <ContentComponent header="Extra Loan Request Approved">
          <p>
            We are pleased to inform you that your extra loan request has been{" "}
            <StatusChip type="approved" /> for{" "}
            <b>{formatCurrency(extraLoan?.amount)}</b>, and the repayment is due
            on <b> {formatDate(extraLoan?.due_date)}</b>. The amount will be
            automatically deducted from your account on the due date. Please
            ensure that you have sufficient funds available to avoid any payment
            issues.
          </p>
          <ContactSupport />
        </ContentComponent>
      );
  }
};

export default PaymentStatus;
