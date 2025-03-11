import useAdmissions from "../../../../services/useAdmissions";
import { Button } from "@mui/material";

function ToProgram({ toggleModal }: any) {
  const { transcripts } = useAdmissions();

  const transcriptStatus = transcripts?.requests?.map((item) => item.status);
  const hasRejectedTranscript = transcriptStatus?.includes("3");
  const hasPendingTranscript = transcriptStatus?.includes("1");

  return (
    <div className="col">
      {hasPendingTranscript ? (
        <div className="card p-2">
          <b>Requested Letters Status</b>
          <p >
            Your transcript verification request has been submitted and is
            currently pending approval. Please wait for further updates.
          </p>
        </div>
      ) : hasRejectedTranscript ? (
        <>
          <p className="">Your previous transcript request was rejected.</p>
          <p className="">
            To proceed, please reupload your transcript for verification.
          </p>
          <Button
            onClick={toggleModal}
            className="self-end"
            variant="contained"
          >
            Reupload Transcript
          </Button>
        </>
      ) : (
        <Button onClick={toggleModal} className="self-end" variant="contained">
          Request Verification Letter
        </Button>
      )}
    </div>
  );
}

export default ToProgram;
