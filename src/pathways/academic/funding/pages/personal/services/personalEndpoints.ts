// services/personalEndpoints.ts
import axios from "axios";
import api, { baseDirectory, multipart } from "../../../../../../services/api/base";

const url = `${baseDirectory}funding/personal/`;

class PersonalEndpoints {
  status = (studentId: string) =>
    api.get(`${url}status.php?student_id=${encodeURIComponent(studentId)}`);

  application = (payload: FormData, studentId: string) =>
    api.post(`${url}application.php?student_id=${encodeURIComponent(studentId)}`, payload, multipart);

  decision = (payload: FormData, studentId: string) =>
    api.post(`${url}decision.php?student_id=${encodeURIComponent(studentId)}`, payload, multipart);

  recallDecision = (payload: FormData, studentId: string) =>
    api.post(`${url}recall_decision.php?student_id=${encodeURIComponent(studentId)}`, payload, multipart);

  applySupplementary = (payload: FormData, studentId: string) =>
    api.post(`${url}supplementary.php?student_id=${encodeURIComponent(studentId)}`, payload, multipart);

  signContract = (payload: any) => {
    if (!payload?.action) return Promise.reject(new Error("Missing 'action'."));
    if (!payload?.student_id) return Promise.reject(new Error("Missing 'student_id'."));

    const { action, student_id, ...rest } = payload;

    const qs = new URLSearchParams();
    qs.set("student_id", String(student_id));
    qs.set("action", String(action));
    if (action === "reject" && rest?.reason) qs.set("reason", String(rest.reason));

    const data = axios.toFormData(rest);
    return api.post(`${url}contract.php?${qs.toString()}`, data, multipart);
  };

  repaymentSchedule = (data: any) =>
    api.post(`${url}repayment_schedule.php`, {
      principal: data?.principal,
      annual_interest_rate: data?.interest,
      months: data?.term,
      first_date: data?.date_approved,
      second_date: data?.date_approved,
      loan_id: data?.loan_id,
    });
}

const personalEndpoints = new PersonalEndpoints();
export default personalEndpoints;
