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
export type { MpowerStatus };
