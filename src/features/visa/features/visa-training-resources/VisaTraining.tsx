import dayjs from "dayjs";
import useVisa from "../../services/hooks/useVisa";
import TrainingGuide from "./TrainingGuide";
import { formatDate } from "../../../../utils/utils";
import RequestMockInterviewModal from "./mock-interview/RequestMockInterviewModal";
import { useState } from "react";

function VisaTraining() {
  const { visa } = useVisa();
  const [openMockModal, setOpenMockModal] = useState(false);
  const toggleMockModal = () => setOpenMockModal(!openMockModal);
  const is7daysAfter = dayjs(visa?.interview_date)?.isSame(
    dayjs(new Date()).subtract(7, "day"),
    "day"
  );
  
  return (
    <div className="col gap-2">
      <TrainingGuide />
      <div className="col">
        {is7daysAfter ? (
          <span className="text-danger">
            Your interview is scheduled for more than 7 days from now ({" "}
            {formatDate(visa?.interview_date)}). You will be able to book the
            mock interview once it is within 7 days.
          </span>
        ) : (
          <button className="primary-border-btn self-end" onClick={toggleMockModal}>
            Request Mock Visa Interview
          </button>
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

export default VisaTraining;
