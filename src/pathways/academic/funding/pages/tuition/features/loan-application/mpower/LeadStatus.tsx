import { useQuery } from "@tanstack/react-query";
import ContactSupport from "../../../../../../../../components/ContactSupport";
import ContentComponent from "../../../../../../../../components/ContentComponent";
import { MpowerStatus } from "../../../../../types/fundingTypes";
import tuitionEndpoints from "../../../services/tuitionEndpoints";
import { InlineLoader } from "../../../../../../../../components/loaders/Loader";

const LeadStatus: React.FC = () => {
  const {
    data: leadStatus,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lead-status"],
    queryFn: tuitionEndpoints.trackMpowerLead,
    select: (response) => response?.data?.data as MpowerStatus["lead"] | null,
  });
  console.log(leadStatus, "leadStatus");
  
  return (
    <ContentComponent header="Mpower Loan Status">
      <p>
        Mpower application has been submited to mpower. Status updates will be
        sent here
      </p>
      {isLoading && !isError ? (
        <InlineLoader />
      ) : (
        leadStatus?.opportunities?.map((school, index) => (
          <div key={index} className="col p-3">
            <p>School : {school?.schoolName}</p>
            <p>Loan Eligibility Status : {school?.eligibilityStatus}</p>
            <p>Loan Progress : {school?.borrowerStepProgress}</p>
          </div>
        ))
      )}
      <ContactSupport />
    </ContentComponent>
  );
};

export default LeadStatus;
