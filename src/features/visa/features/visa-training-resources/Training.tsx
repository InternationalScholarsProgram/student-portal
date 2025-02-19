import dayjs from "dayjs";
import useVisa from "../../services/hooks/useVisa";
import TrainingGuide from "./TrainingGuide";
import { FullLoader } from "../../../../components/loaders/Loader";
import { formatDate } from "../../../../utils/utils";
import RequestMockInterviewModal from "./mock-interview/RequestMockInterviewModal";
import { useState } from "react";

function Training() {
  const [openMockModal, setOpenMockModal] = useState(false);
  const toggleMockModal = () => setOpenMockModal(!openMockModal);
  const { visa, isLoading } = useVisa();
  const is7daysAfter = dayjs(visa?.interview_date)?.isSame(
    dayjs(new Date()).subtract(7, "day"),
    "day"
  );
  if (isLoading) return <FullLoader />;
  return (
    <div>
      <TrainingGuide />
      <div>
        {is7daysAfter ? (
          <span className="text-danger">
            Your interview is scheduled for more than 7 days from now ({" "}
            {formatDate(visa?.interview_date)}). You will be able to book the
            mock interview once it is within 7 days.
          </span>
        ) : (
          <button onClick={toggleMockModal}>Request Mock Visa Interview</button>
        )}
      </div>
      <div>
        <button> View visa interview transcripts</button>
        <button> Visa training videos</button>
        <button> Upload visa support document</button>
      </div>
      <RequestMockInterviewModal
        open={openMockModal}
        toggleModal={toggleMockModal}
      />
    </div>
  );
}

export default Training;
