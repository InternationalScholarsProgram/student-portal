import { useState } from "react";
import { SchoolConsentDocument } from "../types/types";
import Modal from "../../../components/Modal";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ConsentsForm from "./ConsentsForm";

function ConsentStatus({ consent }: { consent: SchoolConsentDocument }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="col gap-2 m-2">
      {!consent.document ? (
        <div className="col gap-2 m-2">
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
          <div className="px-3">
            <p>
              <strong>Consent : </strong>
              <a
                className="underline text-primary-main"
                download
                href={consent?.consent.URL}
              >
                Download Consent/Agreement Form
              </a>
            </p>
            <button
              className="underline text-primary-main my-2"
              onClick={() => setOpen(true)}
            >
              <FileUploadOutlinedIcon fontSize="medium" /> Upload Signed
              Consent/Agreement Form
            </button>
          </div>
          <Modal
            open={open}
            setOpen={setOpen}
            title="School Consent/ Agreement"
          >
            <div className="modal">
              <ConsentsForm setOpen={setOpen} />
            </div>
          </Modal>
        </div>
      ) : consent?.document?.status === 1 ? (
        `Please wait while we review your signed agreement to determine your eligibility to apply to ${consent.school.school_name}.`
      ) : (
        consent?.document?.status === 3 && (
          <p>
            Your signed agreement was <span className="text-warning">rejected</span>
            . View the reason below and re-upload your consent/agreement form.`
          </p>
        )
      )}
    </div>
  );
}

export default ConsentStatus;
