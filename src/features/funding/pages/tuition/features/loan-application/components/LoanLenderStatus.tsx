import React from "react";
import ContentComponent from "../../../../../../../components/ContentComponent";
import { InputsWithLabel } from "../../../../../../../components/inputs/InputField";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import ContactSupport from "../../../../../../../components/ContactSupport";

const convertStatus = (_status: number) => {
  const status = {
    label: "",
    value: 0,
  };
  if (_status === 1) {
    status.label = "new";
    status.value = 1;
  } else if (_status === 2) {
    status.label = "on progress";
    status.value = 2;
  } else if (_status === 3) {
    status.label = "rejected";
    status.value = 3;
  } else if (_status === 9) {
    status.label = "proof of address rejected";
    status.value = 4;
  } else if (_status === 5) {
    status.label = "resubmitted";
    status.value = 2;
  } else if (_status === 4) {
    status.label = "approved";
    status.value = 6;
  } else if (_status === 6) {
    status.label = "approved";
    status.value = 6;
  } else if (_status === 7) {
    status.label = "loan already disbursed";
    status.value = 6;
  }
  return status;
};

const LoanLenderStatus: React.FC<Props> = ({
  loanStatus,
  loanForm,
  remarks,
  loanProvider,
}) => {
  const status = convertStatus(loanStatus);

  switch (loanStatus) {
    case 1:
    case 2:
    case 5:
      return (
        <ContentComponent header={`${loanProvider} loan application status`}>
          <p>
            Your loan application request has been received and is currently
            awaiting review by our team. You will be notified once it moves to
            the next stage.
          </p>
          <ContactSupport />
        </ContentComponent>
      );

    case 3: //total rejection
      return (
        <>
          <p>
            Unfortunately, your application has been <strong>rejected</strong>.
            Please review the reason provided below, resolve the issue, and
            submit a new application.
          </p>
          <p className="p-2">
            <strong>Remarks:</strong> <em>{remarks}</em>
          </p>
          <p>When you're ready, please complete the form below to reapply.</p>
          {loanForm}
        </>
      );
    case 4:
      return (
        <ContentComponent header={`${loanProvider} loan application status`}>
          <p>
            Your request has been approved. You will be notified once the
            application has been made.
          </p>
          <ContactSupport />
        </ContentComponent>
      );
    case 6:
      return (
        <ContentComponent header={`${loanProvider} loan application status`}>
          <p>Loan approved</p>
          <ContactSupport />
        </ContentComponent>
      );
  }
};

export default LoanLenderStatus;
type Props = {
  loanStatus: number;
  loanForm: React.ReactNode;
  remarks: string;
  loanProvider: string;
};
