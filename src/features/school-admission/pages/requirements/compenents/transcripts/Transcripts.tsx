import { useState, useCallback } from "react";
import { Button } from "@mui/material";

import useAdmissions from "../../../../services/useAdmissions";
import TranscriptsModal from "./TranscriptsModal";
import { InlineLoader } from "../../../../../../components/loaders/Loader";
import ToProgram from "./ToProgram";

function Transcripts() {
  const { transcripts } = useAdmissions();
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);

  if (!transcripts?.requirements) return <InlineLoader />;

  // Checks, verified by schools
  const allVerified = transcripts?.requirements?.length
    ? transcripts.requirements.every((item) => item.ver_status === "2")
    : false;

  // Verified by program check
  const noSchoolRecords = transcripts?.school_count === 0;
  const hasApprovedTranscript = transcripts.request?.status === "2";
  const programVerified = noSchoolRecords && hasApprovedTranscript;

  // Exit early if all conditions are met
  if (programVerified || allVerified) return null;

  const canRequestLetter = transcripts?.requirements?.some(
    (item) => !item.ver_id || item.ver_status === "3"
  );

  return (
    <div>
      <h3 className="title-sm my-2">Transcripts Verification</h3>
      <div className="col card p-3">
        <p>
          To proceed with your admission process, your undergraduate degree
          transcripts must be verified by your former institution.
        </p>
        <p>
          Please request a verification letter to submit to your undergraduate
          institution for confirmation.
        </p>

        {noSchoolRecords ? (
          <ToProgram toggleModal={toggleModal} />
        ) : (
          <>
            <b>Requested Letters Status</b>
            <ol className="list-decimal px-5">
              {transcripts.requirements?.map((item, index) => {
                return (
                  <li key={index}>
                    {item.school_name}
                    {item.ver_status === "1"
                      ? ` - Verification in progress.`
                      : item.ver_status === "2"
                      ? ` - Successfully verified.`
                      : item.ver_status === "3"
                      ? ` - Verification rejected.`
                      : " - Verification letter not requested"}
                  </li>
                );
              })}
            </ol>

            {canRequestLetter && (
              <div className="col m-3">
                <Button
                  onClick={toggleModal}
                  className="self-end"
                  variant="contained"
                >
                  Request Verification Letter
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <TranscriptsModal open={open} toggleModal={toggleModal} />
    </div>
  );
}

export default Transcripts;
