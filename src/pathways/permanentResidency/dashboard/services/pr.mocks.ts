import type {
  PRProgressData,
  EB2NIWStatus,
  DVLotteryStatus,
  PRDeadline,
} from "./permanentResidencyEndpoints";

export const mockPRProgress: PRProgressData = {
  eb_2_niw: 48,
  dv_lottery: 22,
  visa: 10,
  travel: 0,
};

export const mockEB2NIW: EB2NIWStatus = {
  petition_upload: true,
  confirmation_letter_upload: false,
  rfe_handling: false,
  ds_260_form: false,
  visa_process: false,
};

export const mockDV: DVLotteryStatus = {
  interest_submission: true,
  pending_member: true,
  completed_applications: false,
  winners: false,
  package_enrollment: false,
  visa_process: false,
};

export const mockDeadlines: PRDeadline[] = [
  {
    title: "NIW Petition – Evidence Upload",
    date: "2025-09-20",
    note: "Upload letters and publications.",
    link: "/pathways/permanent-residency/eb2-niw/petition-upload",
  },
  {
    title: "DV Entry Window (Opens)",
    date: "2025-10-03",
    note: "Submit interest before the window closes.",
    link: "/pathways/permanent-residency/dv-lottery/interest-submission",
  },
  {
    title: "Possible RFE Buffer",
    date: "2025-11-08",
    note: "Prepare to respond quickly if issued.",
  },
];

// small helper for a realistic network delay
export function mockDelay<T>(payload: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(payload), ms));
}
