type MpowerStatus = {
  lead: {
    leadID: string;
    fullName: string;
    emailID: string;
    phoneNumber: string;
    opportunities: {
      borrowerStepProgress: string;
      degree: string;
      eligibilityStatus: string;
      expectedGradDate: string;
      schoolCountry: string;
      schoolName: string;
    }[];
  };
  mpower_started: boolean;
  status: number;
  application: {
    remark: string;
  };
};
type CreditReview = {
  comment: string;
  credit_report: string;
  email: string;
  generated_on: string | Date;
  id: number;
  id_doc: string;
  status: number;
};
type FundingAdvisoryProps = {
  cancel_url: string;
  date: string;
  reschedule_url: string;
  status: number;
  time: string;
  zoom_link: string;
  dateAndTime: Date | null;
};
type LoanDetailsProps = {
  app_id: string;
  school: string;
  program: string;
  application_details: {
    status: number | null;
    remark: string | null;
    [key: string]: any;
  };
  loan_app_feedback: {
    id: number;
    loan_id: string;
    lender: string;
    school: string;
    loan_applied: number;
    loan_awarded: number;
    loan_letter: string;
    approved_on: string;
    loan_status: number;
    status: number;
  };
  loan_application_status: "complete" | "active";
  application_requested: number;
  funding: "MPOWER" | "Sallie";
  remark: string | null;
};
type Application = {
  ach_key: string | null;
  ach_status: number;
  amount: number;
  approved_by: string;
  bank_account_id: string;
  bank_account_number: null;
  bank_account_type: null;
  bank_address: null;
  bank_name: string;
  country: string;
  current_employee: string;
  current_employee_address: string;
  customer_id: string;
  date_applied: string;
  date_approved: string;
  date_of_birth: string;
  email: string;
  employment_status: string;
  gender: string;
  id: number;
  income: number;
  job_title: string;
  kenyan_address: string;
  loan_id: string;
  mandate_id: string;
  marital_status: string;
  next_of_kin_address: string;
  next_of_kin_fullname: string;
  next_of_kin_phone_number: string;
  next_of_kin_relationship: string;
  passport_number: string;
  phone_no: string;
  place_of_birth: string;
  rejection_reason: null | string;
  remark: string;
  rent: number;
  residential_status: string;
  routing_number: null | string;
  social_security_number: string;
  status: number;
  sub_status: number;
  subscription_id: string;
  title: string;
  usa_address: string;
  visa_doc: null | string;
};

export type {
  MpowerStatus,
  CreditReview,
  FundingAdvisoryProps,
  LoanDetailsProps,
  Application,
};
