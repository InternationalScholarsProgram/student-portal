import React from "react";
import ContentComponent from "../../../../../../../components/ContentComponent";
import SallieApplicationForm from "./SallieApplicationForm";
import LoanLenderStatus from "../components/LoanLenderStatus";
import useTuition from "../../../services/useTuition";

const LoanStatus: React.FC = () => {
  const { activeLoanApplication } = useTuition();
  console.log(activeLoanApplication);
  

  if (!activeLoanApplication?.application_requested)
    return (
      <>
        <ContentComponent header="Cosigner approved">
          <p>
            Your cosigner has been approved to cosign you a student loan.
            <br />
            Please submit your details below in order to proceed with the
            funding application process.
          </p>
        </ContentComponent>
        <div className="h-5" />
        <ContentComponent header="Sallie Mae Application Form">
          <SallieApplicationForm />
        </ContentComponent>
      </>
    );

  return (
    <LoanLenderStatus
      // loanStatus={3}
      loanStatus={activeLoanApplication?.application_details?.status || 0}
      loanProvider="Sallie Mae"
      loanForm={
        <ContentComponent header="Sallie Mae Application Form" className="my-3">
          <SallieApplicationForm />
        </ContentComponent>
      }
      remarks={activeLoanApplication?.application_details?.remark || ""}
    />
  );
};

export default LoanStatus;
/*
  switch (status) {
    case 1:
      return (
        <>
          <p>Loan application has been submited to sallie mae</p>
        </>
      );
    case 2:
      return (
        <>
          <p>Loan application has been submited to sallie mae</p>
        </>
      );
    case 3:
      return (
        <>
          <p>Loan application has been submited to sallie mae</p>
        </>
      );
    default:
      break;
  }
      */
