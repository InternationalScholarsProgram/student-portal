type School = {
  course: string;
  id: string;
  school_id: string;
  intake_start: string;
  intake_end: string;
  school_name: string;
  web_link: string;
  program_name: string;
  application_cost: string;
  SOP: string;
  SOP_status: string;
  application_status: string;
  application_details?: {
    app_status: string;
    assigned_to: string | null;
    comment: string | null;
    feedback: {
      credit_remark: string | null;
      feedback: string;
      id_doc: string;
      letter: string;
      loan_status: string;
      remark: null;
      status: string;
    } | null;
    id: string;
    intake: string;
    intake_name: string;
    password: string | null;
    school_link: string | null;
    status: string;
    username: string;
  } | null;
};

type Consent = {
  id: number;
  consent_type: number;
  school_id: string | number;
  program_id: number;
  loan_id: number | null;
  sign_type: "digital" | "hand";
  URL: string;
  description: string;
  signed: string | null;
};

type UploadedDocument = {
  id?: number;
  doc_id: number;
  app_id: string;
  document_name: string;
  comment: string;
  intake_id: string;
  intake_name: string;
  remarks: string | null;
  status: number;
  reject_docname: string;
  item_name: string;
  course: any;
};

interface DocRequirements {
  acronym?: string;
  description?: string;
  id: string;
  consent: Consent | null; // Optional, used for consent documents
  item_name: string;
  sample_link: string;
  type?: string;
  doc_id?: string;
  docs: undefined | UploadedDocument | null;
  uniqueId?: number; // Optional, used for unique identification in lists
}

interface TranscriptsProps {
  school_count: number;
  requirements: TranscriptsRequirementProps[];
  request: TranscriptsRequestProps | null;
}
type TranscriptsRequirementProps = {
  app_id: string;
  proposed_course: string;
  school_name: string;
  ver_status: string;
  verification: string;
  verification_email: string;
  ver_id: string | null;
  transcript: string;
};

type TranscriptsRequestProps = {
  status: string;
  transcript: string;
  transcript_ver_letter: string | null;
};

type GPAReport = {
  gpa: string;
  gpa_doc: string;
  gpa_remark: string | null;
  gpa_status: number;
};

type UploadModalProps = {
  open: boolean;
  disabled: boolean;
  row: DocRequirements;
  onClose: () => void;
  payload: {
    intakeId?: number | null;
    invalidateQuery: () => void;
    applicationId: string;
    proposed_course_id: string | number;
  };
};

export type {
  Consent,
  UploadedDocument,
  School,
  DocRequirements,
  TranscriptsProps,
  GPAReport,
  UploadModalProps,
};
