import { useState } from "react";
import { SchoolConsentDocument } from "../types/types";
import Modal from "../../../components/Modal";
import ConsentsForm from "./ConsentsForm";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";

function ConsentStatus({ consent }: { consent: SchoolConsentDocument }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="col gap-2 my-2">
      {!consent.document ? (
        <div className="col rounded-lg p-3 card gap-2">
          <p>
            <strong>{consent.school.school_name}</strong> requires you to fill
            in and sign the consent/agreement form attached, acknowlegding that
            the International Scholars Program introduced you to the school as
            an agent.
          </p>
          <p>
            Please download the form, fill in the highlighted parts, sign and
            upload as part of your school application requirement.
          </p>
          <div className="col gap-2 px-3">
            <p>
              <strong>Consent/agreement form : </strong>
              <a
                className="text-primary-main"
                {...(consent?.consent.sign_type === "digital" && {
                  target: "_blank",
                })}
                download
                href={consent?.consent.URL}
              >
                {consent?.consent.sign_type === "digital" ? (
                  "View"
                ) : (
                  <>
                    <Download /> Download
                  </>
                )}
              </a>
            </p>
            <Button
              variant="contained"
              className="self-end my-2 row-center"
              onClick={() => setOpen(true)}
            >
              <UploadIcon fontSize="medium" /> Upload
            </Button>
          </div>
        </div>
      ) : consent?.document?.status === 1 ? (
        <div className="rounded-lg p-3 card">
          <p>
            Please wait while we review your signed agreement to determine your
            eligibility to apply to {consent.school.school_name}.
          </p>
        </div>
      ) : (
        consent?.document?.status === 3 && (
          <div className="rounded-lg p-3 card col">
            <p>
              Your signed consent/agreement was{" "}
              <span className="text-error-main">rejected</span>. View the reason
              below and re-upload your consent/agreement form.
            </p>
            <p>Reason: {consent?.document?.remarks}</p>
            <Button
              variant="contained"
              className="self-end my-2 row-center"
              onClick={() => setOpen(true)}
            >
              <UploadIcon fontSize="medium" /> Upload
            </Button>
          </div>
        )
      )}
      <Modal open={open} setOpen={setOpen} title="School Consent/ Agreement">
        <div className="modal">
          <ConsentsForm setOpen={setOpen} />
        </div>
      </Modal>
    </div>
  );
}

export default ConsentStatus;
