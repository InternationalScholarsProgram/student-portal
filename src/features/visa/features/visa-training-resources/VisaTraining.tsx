import useVisa from "../../services/hooks/useVisa";
import TrainingGuide from "./TrainingGuide";
import AccessMock from "./mock-interview/AccessMock";
import { useState } from "react";
import InterviewTranscriptsModal from "./InterviewTranscriptsModal";
import SupportDocumentsModal from "./SupportDocumentsModal";
import TrainingVideosModal from "./TrainingVideosModal";
import { useMutation } from "@tanstack/react-query";
import visaEndpoints from "../../services/visaEndpoints";
import ContentComponent from "../../../../components/ContentComponent";

type keys = "transcripts" | "videos" | "supportDocuments";

function VisaTraining() {
  const { visa, inValidateStatus, ds160Review } = useVisa();
  const [open, setOpen] = useState({
    transcripts: false,
    videos: false,
    supportDocuments: false,
  });
  const toggleModal = (key: keys) => setOpen({ ...open, [key]: !open[key] });

  const updateCounter = useMutation({
    mutationFn: visaEndpoints.updateCounter,
    onSuccess: inValidateStatus,
  });

  return (
    <div className="col gap-2 my-2">
      {visa?.status <= 6 && <TrainingGuide />}
      {ds160Review.support ? (
        <AccessMock />
      ) : (
        <div className="col gap-4">
          <ContentComponent header="Visa interview training resources">
            <p>
              Access a variety of training resources to enhance your
              preparation.
            </p>
            <p>Choose from the available options below:</p>
            <div className="row justify-end gap-2">
              <button
                className="primary-border-btn"
                onClick={() => toggleModal("transcripts")}
              >
                View Training Transcripts
              </button>
              <button
                className="primary-border-btn"
                onClick={() => toggleModal("videos")}
              >
                Watch Training Videos
              </button>
            </div>
          </ContentComponent>
          <ContentComponent header="Mock Interview">
            <p>
              In order to proceed with booking your mock interview, you are
              required to upload the necessary support document. This helps
              ensure a smooth and efficient process.
            </p>
            <button
              className="primary-btn self-end"
              onClick={() => toggleModal("supportDocuments")}
            >
              Upload Documents
            </button>
          </ContentComponent>
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
      )}
    </div>
  );
}

export default VisaTraining;
