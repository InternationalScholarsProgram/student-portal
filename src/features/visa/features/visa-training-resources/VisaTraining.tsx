import dayjs from "dayjs";
import useVisa from "../../services/hooks/useVisa";
import TrainingGuide from "./TrainingGuide";
import { formatDate } from "../../../../utils/utils";
import RequestMockInterviewModal from "./mock-interview/RequestMockInterviewModal";
import { useState } from "react";
import InterviewTranscriptsModal from "./InterviewTranscriptsModal";
import SupportDocumentsModal from "./SupportDocumentsModal";
import TrainingVideosModal from "./TrainingVideosModal";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import { toast } from "react-toastify";

type keys = "transcripts" | "videos" | "mock" | "supportDocuments";

function VisaTraining() {
  const { visa } = useVisa();
  const [open, setOpen] = useState({
    transcripts: false,
    videos: false,
    supportDocuments: false,
    mock: false,
  });
  const toggleModal = (key: keys) => setOpen({ ...open, [key]: !open[key] });
  const is7daysAfter = dayjs(visa?.interview_date)?.isSame(
    dayjs(new Date()).subtract(7, "day"),
    "day"
  );

  const updateCounter = useMutation({
    mutationFn: visaEndpoints.updateCounter,
    onSuccess: (response) => {
      toast.success(response.data.message);
    },
  });

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
          <button
            className="primary-border-btn self-end"
            onClick={() => toggleModal("mock")}
          >
            Request Mock Visa Interview
          </button>
        )}
      </div>
      <div className="row gap-2">
        <button
          className="primary-border-btn"
          onClick={() => toggleModal("transcripts")}
        >
          View visa interview transcripts
        </button>
        <button
          className="primary-border-btn"
          onClick={() => toggleModal("videos")}
        >
          Visa training videos
        </button>
        <button
          className="primary-btn"
          onClick={() => toggleModal("supportDocuments")}
        >
          Upload visa support document
        </button>
      </div>
      <RequestMockInterviewModal
        open={open.mock}
        toggleModal={() => toggleModal("mock")}
      />
      <InterviewTranscriptsModal
        open={open.transcripts}
        toggleModal={() => toggleModal("transcripts")}
        updateCounter={updateCounter}
      />
      <SupportDocumentsModal
        open={open.supportDocuments}
        toggleModal={() => toggleModal("supportDocuments")}
      />
      <TrainingVideosModal
        open={open.videos}
        toggleModal={() => toggleModal("videos")}
        updateCounter={updateCounter}
      />
    </div>
  );
}

export default VisaTraining;
