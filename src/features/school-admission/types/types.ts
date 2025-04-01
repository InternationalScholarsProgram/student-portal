type School = {
  course: string;
  id: string;
  school_id: string;
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
  signed: string | null; // Adjust based on actual data type (e.g., `string | null` if applicable)
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
};

type SchoolConsentDocument = {
  school: School;
  consent: Consent;
  document: UploadedDocument | undefined;
};

type SchoolConsentDocumentArray = SchoolConsentDocument[] | undefined;

interface DocRequirements {
  acronym?: string;
  description?: string;
  id: string;
  item_name: string;
  sample_link?: string;
  type?: string;
}
interface TranscriptsProps {
  school_count: number;
  requirements: TranscriptsRequirementProps[];
  requests: TranscriptsRequestProps[];
}
type TranscriptsRequirementProps = {
  app_id: string;
  proposed_course: string;
  id: string;
  school_name: string;
  verification: string;
  ver_id: string | null;
  transcript: string;
  ver_status: string;
  verification_email: string;
};
type TranscriptsRequestProps = {
  app_id: string | null;
  city: string | null;
  code: string | null;
  email: string;
  id: string;
  request_letter: string;
  status: string;
  transcript: string | null;
};

type GPAReport = {
  gpa: string;
  gpa_doc: string;
  gpa_remark: string | null;
  gpa_status: number;
};

export type {
  SchoolConsentDocument,
  SchoolConsentDocumentArray,
  Consent,
  UploadedDocument,
  School,
  DocRequirements,
  TranscriptsProps,
  GPAReport,
};
