import FundingOptions from "../funding-advisory/FundingOptions";
import MpowerLoanForm from "./MpowerLoanForm";
import useFunding from "../../../../services/useFunding";
import ContentComponent from "../../../../../../components/ContentComponent";
import AppliedLoanStatus from "./AppliedLoanStatus";
import SchoolHeader from "../../components/SchoolHeader";

function Mpower() {
  const { school, status } = useFunding();
  return (
    <div className="py-2">
      <h3 className="title-sm py-2">
        Welcome to Tuition and Living Expenses loan application process
      </h3>
      <SchoolHeader school={school} />
      <ContentComponent
        className="my-3"
        header={!status ? "Mpower Loan Form" : "Mpower loan application form"}
      >
        {!status ? <FundingOptions /> : <MpowerLoanForm />}
        <AppliedLoanStatus />
      </ContentComponent>
    </div>
  );
}

export default Mpower;
