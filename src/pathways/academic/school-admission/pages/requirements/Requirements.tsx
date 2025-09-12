import Guides from "../../components/Guides";
import Loader, {
  InlineLoader,
  SkeletonLoader,
} from "../../../../../components/loaders/Loader";
import BookMeeting from "../../components/BookMeeting";
import Meeting from "../../components/Meeting";
import useAdmissions from "../../services/useAdmissions";
import NoOpenIntakes from "../../components/NoOpenIntakes";
import EligibilityStatusCheck from "../../components/EligibilityStatusCheck";
import Transcripts from "./compenents/transcripts/Transcripts";
import ProposedSchools from "../../components/ProposedSchools";
import IntakeStatus from "../../components/IntakeStatus";

function Requirements() {
  const {
    eligibility,
    isLoadingEligibility,
    status,
    isLoading,
    currentIntake,
    transcripts,
  } = useAdmissions();

  if (isLoadingEligibility || isLoading) return <SkeletonLoader />;

  if (eligibility?.code !== 200)
    return <EligibilityStatusCheck eligibility={eligibility} />;

  if (status?.code === 1) return <NoOpenIntakes />;
  if (status?.code === 2) return <BookMeeting />;
  if (status?.code === 3) return <Meeting />;
  if (status?.code === 4 || status?.code === 5)
    return (
      <div className="col gap-3">
        <IntakeStatus currentIntake={currentIntake} />
        <div>
          <Guides />
        </div>
        <Transcripts />
        {transcripts?.hasAnyVerified && <ProposedSchools />}
      </div>
    );
}

export default Requirements;
