import React from "react";

// declare module "react" {
//   interface ButtonHTMLAttributes<T> extends React.ButtonHTMLAttributes<T> {
//     btnstyles?: string;
//   }
// }

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnstyles?: string;
}
interface ModalProps {
  open: boolean;
  toggleModal: () => void;
}
interface UserProfile {
  Date_enlored: string; // Date string in YYYY-MM-DD format
  GMAT: string; // Numeric string
  GRE: string | null; // Can be null
  ac_level: string; // Academic level
  city: string;
  converted: string;
  country: string;
  country_undergraduate: string;
  county: string | null;
  credit_report: string;
  credit_report_status: string;
  credit_state: string | null;
  date_process_withdrwal: string; // Date in YYYY-MM-DD format
  date_request_withdrwal: string; // Date in YYYY-MM-DD format
  degree: string;
  email: string;
  fullnames: string;
  gpa: string; // Assuming it's stored as a string
  high_school: string;
  id_card: string;
  id_no: string;
  intake: string | null;
  kcpe_cert: string;
  kcse_cert: string;
  kcse_grade: string;
  kcse_point: string;
  member_no: string;
  package: string;
  phone_no: string | null;
  photo: string | null;
  prog_email: string;
  region: string;
  reject_message: string;
  report: string;
  sign_contract: string;
  signed_contract: string | null;
  transcript: string;
  u_cert: string;
  u_grade: string;
  u_university: string;
  university: string | null;
  withdrwal_status: string;
  withdwal_balance: string;
}

export type { CustomButtonProps, ModalProps, UserProfile };
