import SchoolHeader from "../../components/SchoolHeader";
import useTuition from "../../services/useTuition";
import LoanStatus from "./components/LoanStatus";

function LoanApplication() {
  const { activeLoanApplication, tuitionStatus } = useTuition();
  if (!activeLoanApplication) return <>An error occured</>;

  return (
    <div className="">
      <h3 className="title-sm py-2">
        Welcome to Tuition and Living Expenses loan application process
      </h3>
      <SchoolHeader
        schoolName={activeLoanApplication?.school}
        program={activeLoanApplication?.program}
      />
      <div className="h-2" />
      <LoanStatus status={tuitionStatus} />
    </div>
  );
}

export default LoanApplication;
