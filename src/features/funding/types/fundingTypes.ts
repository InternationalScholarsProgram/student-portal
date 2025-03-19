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
};
export type { MpowerStatus, CreditReview, FundingAdvisoryProps };
