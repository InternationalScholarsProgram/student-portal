import { useState, useEffect, FormEvent, useMemo } from "react";
import Modal from "../../../../../../components/Modal";
import { admissionAPIs } from "../../../services/admissionAPIs";
import { UploadModalProps } from "../../../types/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { errorMsg } from "../../../../../../components/errors/errorMsg";
import {
  ConsentInstructions,
  DocumentInstructions,
  FileUploadSection,
} from "./UploadModalComponents";
import FormFooterBtns from "../../../../../../components/buttons/FormFooterBtns";

const ALLOWED_MIME_PREFIX = "image/";
const ALLOWED_MIME_EXACT = "application/pdf";
const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "bmp",
  "tif",
  "tiff",
  "svg",
  "heic",
  "heif",
]);

function isAllowedFile(file: File | null): boolean {
  if (!file) return false;
  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  const ext = name.includes(".") ? name.split(".").pop() || "" : "";

  const mimeOk = type === ALLOWED_MIME_EXACT || type.startsWith(ALLOWED_MIME_PREFIX);
  const extOk = ALLOWED_EXTENSIONS.has(ext);

  // Accept if either the MIME (reliable) or extension (fallback) is OK
  return mimeOk || extOk;
}

const UploadModal = ({
  open,
  row,
  onClose,
  payload,
  disabled,
}: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState<string>(row?.docs?.comment || "");
  const docs = row?.docs;
  const hideBtn =
    row?.consent?.sign_type === "digital" || docs?.status === 2 || disabled;

  const title = useMemo(() => {
    if (row?.id === "12") return `Extra document - ${row?.description}`;
    if (row?.id) return row?.item_name;
    return "Upload an extra document";
  }, [row]);

  useEffect(() => {
    const getComment =
      (row?.id === "15"
        ? row?.doc_id
        : row?.id === "14"
        ? row?.consent?.id
        : row?.item_name
      )?.toString() || "";
    setFile(null);
    setComment(docs?.comment ? docs?.comment : getComment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  // Gate file selection to PDFs and images only
  const handleSetFile = (f: File | null) => {
    if (!f) {
      setFile(null);
      return;
    }
    if (!isAllowedFile(f)) {
      toast.error("Only PDF and image files are allowed (PDF, PNG, JPG, JPEG, GIF, WEBP, BMP, TIF/TIFF, SVG, HEIC/HEIF).");
      setFile(null);
      return;
    }
    setFile(f);
  };

  const upload = useMutation({
    mutationFn: (e: FormEvent) => {
      e.preventDefault();

      // Double-check before submit
      if (!isAllowedFile(file)) {
        throw new Error(
          "Invalid file type. Please upload a PDF or an image file."
        );
      }

      const data = {
        school_app_id: payload.applicationId,
        intake_id: payload.intakeId,
        doc_type_id: row?.id || "12",
        comment,
        action: docs?.document_name ? "update" : "upload",
        ...(docs?.document_name ? { current_doc_name: docs.document_name } : {}),
        file,
        ...(docs?.course?.id ? { proposed_course_id: payload.proposed_course_id } : {}),
      };

      return admissionAPIs.uploadFile(data);
    },
    onSuccess: () => {
      payload.invalidateQuery();
      toast.success("Document uploaded successfully");
      onClose();
    },
    onError: (error) => toast.error(errorMsg(error)),
  });

  if (!open) return null;

  return (
    <Modal title={title} open={open} setOpen={onClose}>
      <div className="col p-3 w-[80vw] sm:w-[65vw] lg:w-[50vw] xl:w-[38vw]">
        <ConsentInstructions row={row} />
        <DocumentInstructions row={row} />
        <form onSubmit={upload.mutate} className="col gap-2 py-2">
          <FileUploadSection
            row={row}
            setFile={handleSetFile}  // <-- use the guarded setter
            comment={comment}
            setComment={setComment}
          />
          <FormFooterBtns
            onClose={onClose}
            btnText={upload.isPending ? "Uploading..." : docs ? "Update" : "Upload"}
            disabled={upload.isPending || !file}
            hideBtn={hideBtn}
          />
        </form>
      </div>
    </Modal>
  );
};

export default UploadModal;
