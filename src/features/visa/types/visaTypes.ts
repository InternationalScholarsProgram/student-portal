import { UseMutationResult } from "@tanstack/react-query";
import { ModalProps } from "../../../types";
import { AxiosResponse } from "axios";

type Counter = "videos" | "transcripts";
interface CounterModal extends ModalProps {
  updateCounter: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    Counter,
    unknown
  >;
}

type VisaVideos = {
  description: string | null;
  det_desc: string | null;
  det_id: string;
  det_link: string;
  det_watched: string;
  level: string | null;
  res_id: string;
  slide_name: string;
};
type Transcripts = {
  id: string;
  interview_date: string;
  interview_feedback: string;
  interview_time: string;
  kcse_grade: string;
  mock_score: string | null;
  program: string;
  region: string;
  school: string;
  visa_outcome: string;
};
type VisaObject = {
  advisor: string;
  cancel_url: string;
  category: string | null;
  denied_visa: number;
  end_time: string;
  event: string;
  interview_date: string | Date; // Format: "DD-MM-YYYY"
  interviewDateAndTime: Date;
  interview_feedback: string | null;
  interview_time: string; // Format: "HH:MM AM/PM"
  ivr_no: string | null;
  mock_comment: string;
  mock_date: string | null;
  mock_marks: number;
  mock_questions: string;
  mock_score: number;
  mock_time: string | null;
  remark: string;
  reschedule_url: string;
  status: number;
  stu_email: string;
  stu_id: number;
  stu_name: string;
  transcript_counter: number;
  video_counter: number;
  visa_doc: string;
  visa_outcome: string | null;
  visa_slip: string | null;
  zoom_link: string | null;
  mockDateAndTime: Date | null;
  hasInterviewDatePassed: boolean;
};
type Ds160Review = {
  application_id: string;
  approved_before: "yes" | "no";
  birth_year: number;
  comment: string | null;
  course: string;
  declined: number;
  denied_before: "yes" | "no";
  financial: "Loan" | "Scholarship" | "Statement" | "";
  intake: string;
  name: string;
  reporting_date: string;
  req_id: number;
  reviewed: number;
  school_name: string;
  security_answer: string;
  stu_email: string;
  support: string | null;
  surname: string;
  visa_attempt: "First" | "Second" | "Third+" | string;
  with_family: "Alone" | "Family" | "Friends" | string;
};

type MockQuestion = {
  email: string;
  id: number;
  marks: number;
  question: string;
  quiz_id: number;
  visa_interview_id: 124;
};
type SevisFeePayment = {
  id: number;
  email: string;
  reason: string;
  document: string;
  fullname_mpesa: string | number | null;
  phone_number_mpesa: string | number | null;
  sevis_number: string;
  school_app_id: string | number | null;
  visa_date: string | null;
  amt_kes: number | null;
  amt_usd: number | null;
  dateapp: string;
  status: number;
  reason_denied: string | null;
  i901_number: number | null;
  sevis_pay_date: string | null;
  visa_status: string | number | null;
};
type FeedBack = {
  id: number;
  name: string;
  email: string;
  visa_outcome: number;
  interview_feedback: string;
  visa_doc: null | string;
  county: string;
  school: string;
  program: string;
  cover_story: null | string;
  status: number;
  denied_visa: number;
  app_id: number;
  publish: number;
  remarks: string;
  pending_comments: string;
};

export type {
  Counter,
  CounterModal,
  VisaVideos,
  Transcripts,
  VisaObject,
  Ds160Review,
  MockQuestion,
  SevisFeePayment,
  FeedBack,
};
