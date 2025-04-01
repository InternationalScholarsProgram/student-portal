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
  application_requested: number;
  funding: "MPOWER" | "Sallie";
  remark: string | null;
};

export type {
  MpowerStatus,
  CreditReview,
  FundingAdvisoryProps,
  LoanDetailsProps,
};
