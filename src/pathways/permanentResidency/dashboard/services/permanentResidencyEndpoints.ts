import api, { baseDirectory } from "../../../../services/api/base";
import {
  mockPRProgress,
  mockEB2NIW,
  mockDV,
  mockDeadlines,
  mockDelay,
} from "./pr.mocks";

/** Toggle via .env(.local)
 *  VITE_USE_PR_MOCKS=1 → use mocks
 *  VITE_USE_PR_MOCKS=0 → call backend
 */
const USE_MOCKS = String(import.meta.env.VITE_USE_PR_MOCKS ?? "") === "1";

/* ---------- Types that match your components ---------- */

export type PRProgressData = {
  eb_2_niw: number;
  dv_lottery: number;
  visa: number;
  travel: number;
};

export type EB2NIWStatus = {
  petition_upload: boolean;
  confirmation_letter_upload: boolean;
  rfe_handling: boolean;
  ds_260_form: boolean;
  visa_process: boolean;
};

export type DVLotteryStatus = {
  interest_submission: boolean;
  pending_member: boolean;
  completed_applications: boolean;
  winners: boolean;
  package_enrollment: boolean;
  visa_process: boolean;
};

export type PRDeadline = {
  title: string;
  date: string;     // ISO date string
  note?: string;
  link?: string;
};

const url = baseDirectory + "pr-dashboard/"; // adjust when backend is ready

class PREndpoints {
  trackProgress = async (): Promise<PRProgressData> => {
    if (USE_MOCKS) return mockDelay(mockPRProgress);
    const res = await api.get(`${url}progress.php`);
    return (res?.data?.data ?? {}) as PRProgressData;
  };

  getEB2NIWStatus = async (): Promise<EB2NIWStatus> => {
    if (USE_MOCKS) return mockDelay(mockEB2NIW);
    const res = await api.get(`${url}eb2_status.php`);
    return (res?.data?.data ?? {}) as EB2NIWStatus;
  };

  getDVLotteryStatus = async (): Promise<DVLotteryStatus> => {
    if (USE_MOCKS) return mockDelay(mockDV);
    const res = await api.get(`${url}dv_status.php`);
    return (res?.data?.data ?? {}) as DVLotteryStatus;
  };

  getDeadlines = async (): Promise<PRDeadline[]> => {
    if (USE_MOCKS) return mockDelay(mockDeadlines);
    const res = await api.get(`${url}deadlines.php`);
    return (res?.data?.data ?? []) as PRDeadline[];
  };
}

const prEndpoints = new PREndpoints();
export default prEndpoints;
