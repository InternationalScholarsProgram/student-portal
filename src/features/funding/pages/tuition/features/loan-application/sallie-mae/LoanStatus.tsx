import React from "react";
import ContentComponent from "../../../../../../../components/ContentComponent";
import SallieApplicationForm from "./SallieApplicationForm";

const LoanStatus: React.FC<{ status: number }> = ({ status }) => {
  if (!status)
    return (
      <>
        <div className="h-5" />
        <ContentComponent header="Sallie Mae Application Form">
          <SallieApplicationForm />
        </ContentComponent>
      </>
    );
  switch (status) {
    case 1:
      return (
        <>
          <p>Loan application has been submited to sallie mae</p>
        </>
      );
    default:
      break;
  }
};

export default LoanStatus;
