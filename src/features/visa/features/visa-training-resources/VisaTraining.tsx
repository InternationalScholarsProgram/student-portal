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

type keys = "transcripts" | "videos" | "mock" | "supportDocuments";

function VisaTraining() {
  const { visa, inValidateStatus, ds160Review } = useVisa();
  const [open, setOpen] = useState({
    transcripts: false,
    videos: false,
    supportDocuments: false,
    mock: false,
  });
  const toggleModal = (key: keys) => setOpen({ ...open, [key]: !open[key] });

  const updateCounter = useMutation({
    mutationFn: visaEndpoints.updateCounter,
    onSuccess: inValidateStatus,
  });

  return (
    <div className="col gap-2 my-2">
      <TrainingGuide />
      {ds160Review.support ? (
        <RequestMockInterviewModal
          open={open.mock}
          toggleModal={() => toggleModal("mock")}
          visa={visa}
        />
      ) : (
        <div className="col">
          <p>View Training resources</p>
          <div className="row justify-end gap-2">
            {visa.transcript_counter > 0 && visa.video_counter > 0 ? (
              <>
                <button
                  className="primary-border-btn"
                  onClick={() => toggleModal("transcripts")}
                >
                  View transcripts
                </button>
                <button
                  className="primary-border-btn"
                  onClick={() => toggleModal("videos")}
                >
                  View videos
                </button>
              </>
            ) : (
              <p className="w-full text-left">
                No training resources available
              </p>
            )}
          </div>
          <div className="col">
            <p>
              To be able to book the mock interview, you need to upload the
              support document.
            </p>
            <button
              className="primary-btn self-end"
              onClick={() => toggleModal("supportDocuments")}
            >
              Upload support document
            </button>
          </div>
        </div>
      )}
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
