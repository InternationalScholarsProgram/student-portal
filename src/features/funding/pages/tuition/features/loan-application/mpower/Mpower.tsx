import { useCallback } from "react";
import useFunding from "../../../../../services/useFunding";
import useTuition from "../../../services/useTuition";
import MpowerLoanForm from "./MpowerLoanForm";
import ContentComponent from "../../../../../../../components/ContentComponent";
import { InputsWithLabel } from "../../../../../../../components/inputs/InputField";
import PrimaryBtn from "../../../../../../../components/buttons/PrimaryBtn";
import AppliedLoanStatus from "./AppliedLoanStatus";
import SchoolHeader from "../../../components/SchoolHeader";

function Mpower() {
  const { selectedSchool, status } = useFunding();
  const { mpowerStatus } = useTuition();

  const renderMpowerStatus = useCallback(() => {
    if (!mpowerStatus)
      return (
        <ContentComponent header={"Mpower loan application form"}>
          <MpowerLoanForm />
        </ContentComponent>
      );
    switch (mpowerStatus?.status) {
      case 1:
      case 6:
      case 10:
        return (
          <ContentComponent header="Mpower loan application status">
            <p>Application Pending review</p>
          </ContentComponent>
        );
      case 2:
        return (
          <ContentComponent header="Mpower loan application  is in progress">
            <p>
              Our team has verified your documents and has started working on
              the loan application. Please keep cheking here for further action.
            </p>
          </ContentComponent>
        );
      case 3:
      case 9:
        return (
          <ContentComponent header="Your loan application was rejected">
            <p>
              Kindly take note of the rejection comment below and fix the issue
              before making another application
            </p>
            <p>
              Remarks : <em> {mpowerStatus?.application.remark}</em>
            </p>
            <form className="col gap-2 p-4">
              <p>
                Permanent physical address details (Don't give P.O.Box address)
              </p>
              <InputsWithLabel
                label="Proof of address"
                inputLabel="Building/Apartment/Suite/Land refrence number*"
                name="address"
              />

              <InputsWithLabel
                inputLabel="Proof of address"
                type="file"
                name="file"
              />
              <PrimaryBtn type="submit" className="self-end">
                Upload
              </PrimaryBtn>
            </form>
          </ContentComponent>
        );
      case 4:
        return <AppliedLoanStatus />;

      default:
        return <AppliedLoanStatus />;
    }
  }, [mpowerStatus]);

  return (
    <div className="py-2">
      <h3 className="title-sm py-2">
        Welcome to Tuition and Living Expenses loan application process
      </h3>
      <SchoolHeader school={selectedSchool} />
      <div className="h-2" />
      {renderMpowerStatus()}
    </div>
  );
}

export default Mpower;
