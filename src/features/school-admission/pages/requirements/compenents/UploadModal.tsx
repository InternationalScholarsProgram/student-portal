import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Modal from "../../../../../components/Modal";
import FormFooterBtns from "../../../../../components/buttons/FormFooterBtns";

interface UploadedDoc {
  document_name?: string;
  remarks?: string;
  status: number;
  comment: string;
  course?: { id: number };
}

interface CombinedReqDoc {
  id?: string;
  item_name: string;
  sample_link?: string;
  docs?: UploadedDoc;
  uniqueId: number | string;
}

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  doc: CombinedReqDoc | null;
  intakeId?: number | null;
  appId: string;
  onSubmit: (formData: FormData) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  open,
  onClose,
  doc,
  onSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState<string>(doc?.docs?.comment || "");

  useEffect(() => {
    if (!open) {
      setFile(null);
      setComment(doc?.docs?.comment || "");
    }
  }, [open, doc]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("comment", comment);
    fd.append("doc_type_id", doc?.id || "12");
    fd.append("action", doc?.docs?.document_name ? "update" : "upload");
    if (doc?.docs?.document_name) {
      fd.append("current_doc_name", doc.docs.document_name);
    }
    if (doc?.docs?.course?.id) {
      fd.append("proposed_course_id", String(doc.docs.course.id));
    }
    onSubmit(fd);
  };

  if (!open) return null;

  const renderUploadFields = () => (
    <div className="space-y-3">
      {doc?.sample_link && (
        <p>
          View sample:{" "}
          <a
            href={doc.sample_link}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            Click Here
          </a>
        </p>
      )}
      <div>
        <label className="block mb-1">Upload Document</label>
        <input type="file" required onChange={handleFileChange} />
      </div>
      <div>
        <label className="block mb-1">Comment</label>
        <input
          type="text"
          value={comment}
          required
          onChange={handleCommentChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
    </div>
  );

  const renderBody = () => {
    const status = doc?.docs?.status;
    if (status === 2) {
      return (
        <div className="space-y-2">
          <p>
            Document <strong>approved</strong>.
          </p>
          <a
            href={`/school_app_docs/${doc?.docs?.document_name}`}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            View Uploaded Document
          </a>
        </div>
      );
    }
    if (status === 1) {
      return (
        <div className="space-y-4">
          <p className="text-yellow-800">Your document is pending review.</p>
          <a
            href={`/school_app_docs/${doc?.docs?.document_name}`}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            View Uploaded Document
          </a>
          {renderUploadFields()}
        </div>
      );
    }
    if (status === 3) {
      return (
        <div className="space-y-4">
          <p className="text-red-800">Your document was rejected.</p>
          <p className="italic">Comments: {doc?.docs?.remarks}</p>
          <a
            href={`/school_app_docs/${doc?.docs?.document_name}`}
            target="_blank"
            rel="noreferrer"
            className="underline text-blue-600"
          >
            View Uploaded Document
          </a>
          <div>
            <strong>Resubmit document:</strong>
            {renderUploadFields()}
          </div>
        </div>
      );
    }
    // default / new upload
    return renderUploadFields();
  };

  return (
    <Modal
      open={open}
      setOpen={onClose}
      title={doc?.item_name || "Add Extra Document"}
    >
      <div className="modal">
        <form onSubmit={handleSubmit}>
          {renderBody()}
          <FormFooterBtns
            onClose={onClose}
            btnText={doc?.docs?.document_name ? "Update" : "Submit"}
            hideBtn={doc?.docs?.status === 2}
          />
        </form>
      </div>
    </Modal>
  );
};

export default UploadModal;
