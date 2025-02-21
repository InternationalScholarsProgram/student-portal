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
};

type Consent = {
  id: number;
  consent_type: number;
  school_id: string |number;
  program_id: number;
  loan_id: number | null;
  sign_type: string;
  URL: string;
  signed: string | null; // Adjust based on actual data type (e.g., `string | null` if applicable)
};

type UploadedDocument = {
  doc_id: number;
  app_id: string;
  document_name: string;
  comment: string;
  intake_id: string;
  intake_name: string;
  remarks: string | null;
  status: number;
  reject_docname: string;
};

type SchoolConsentDocument = {
  school: School;
  consent: Consent;
  document: UploadedDocument;
};

type SchoolConsentDocumentArray = SchoolConsentDocument[];

export type {
  SchoolConsentDocument,
  SchoolConsentDocumentArray,
  Consent,
  UploadedDocument,
  School,
};
