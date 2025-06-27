import React from "react";
import { DocRequirements } from "../../../types/types";
import PickFileButton from "../../../../../components/buttons/PickFileButton";
import InputField from "../../../../../components/inputs/InputField";
import { BASE_URL } from "../../../../../services/api/base";
import StatusChip from "../../../../../components/StatusChip";
const docUrl = BASE_URL + "/login/member/dashboard/school_app_docs/";

const convertStatus = (status: number) =>
  status === 2 ? "approved" : status === 1 ? "pending" : "rejected";

const DocumentInstructions: React.FC<{ row: DocRequirements }> = ({ row }) => {
  if (!row?.id || row?.id === "12" || row?.id === "14") return null;
  return (
    <div onClick={() => console.log(row)} className="my-2">
      <p>
        Sample document :
        <a href={row?.sample_link} className="text-primary-light px-2">
          View
        </a>
      </p>
      <p>
        Instructions:
        <span className="px-2 first-letter:uppercase">{row?.description}</span>
      </p>
    </div>
  );
};
const ConsentInstructions: React.FC<{ row: DocRequirements }> = ({ row }) => {
  if (!row?.consent?.id) return null;
  const isDigital = row.consent.sign_type === "digital";
  return (
    <p>
      Please use this{" "}
      <a
        target="_blank"
        className="text-primary-light"
        href={row?.sample_link}
        rel="noopener noreferrer"
      >
        Link
      </a>{" "}
      to{" "}
      {isDigital
        ? "sign the consent form"
        : "download, sign and upload it below"}
      .
    </p>
  );
};

const FileUploadSection: React.FC<{
  row: DocRequirements;
  setFile: (f: File | null) => void;
  comment: string;
  setComment: (c: string) => void;
}> = ({ row, setFile, comment, setComment }) => {
  const docs = row?.docs;
  const status = docs?.status || 0;

  if (row?.consent?.sign_type === "digital") return null;

  return (
    <div className="col p-2 card mx-2">
      {!docs ? (
        <>
          <PickFileButton setFiles={setFile} />
          {!row?.id && (
            <div className="col w-4/5 my-4">
              <InputField
                label="Add Comment"
                placeholder="Describe the document"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="row items-center gap-1">
            <p>Uploaded Document:</p>
            <a
              href={docUrl + docs.document_name}
              target="_blank"
              className="text-primary-light flex-1 truncate"
              rel="noopener noreferrer"
            >
              View
            </a>
          </div>
          <div className="row items-center gap-2">
            <p>Status:</p>
            <StatusChip type={convertStatus(status)} />
          </div>
          {status === 3 && (
            <div className="col">
              <p>
                <b>Reason for Rejection: </b>
                <em className="first-letter:uppercase">{docs.remarks}</em>
              </p>
              {docs.reject_docname && (
                <p>
                  <a
                    className="text-primary-light"
                    href={docUrl + docs.reject_docname}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>{" "}
                  Suggested Document
                </p>
              )}
            </div>
          )}
          {status !== 2 && (
            <PickFileButton text="Replace File" setFiles={setFile} />
          )}
        </>
      )}
    </div>
  );
};

export { DocumentInstructions, ConsentInstructions, FileUploadSection };
