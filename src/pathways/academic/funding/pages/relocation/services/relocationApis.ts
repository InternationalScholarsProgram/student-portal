import axios from "axios";
import api, {
  baseDirectory,
  multipart,
} from "../../../../../../services/api/base";

const url = `${baseDirectory}funding/relocation/`;

class RelocationApis {
  application = (payload: FormData) =>
    api.post(`${url}application.php`, payload, multipart);

  decision = (payload: FormData) =>
    api.post(`${url}desicion.php`, payload, multipart);

  status = () => api.get(`${url}status.php`);

  /**
   * Unified signer:
   * - Accept: payload must include { action: "accept", student_id, file, loan_id, stu_name, ip, city, country_name }
   * - Reject: payload must include { action: "reject", student_id, reason, loan_id, ip, city, country_name }
   *
   * Backend requires `action` (and usually `student_id`) in the QUERY STRING.
   * We therefore move those keys to the URL and send the rest in the FormData body.
   */
  signContract = (payload: any) => {
    if (!payload || !payload.action) {
      return Promise.reject(new Error("Missing 'action' in payload (accept|reject)."));
    }
    if (!payload.student_id) {
      return Promise.reject(new Error("Missing 'student_id' (email) in payload."));
    }

    const { action, student_id, ...rest } = payload;

    // Build query string with required fields
    const qs = new URLSearchParams();
    qs.set("student_id", String(student_id));
    qs.set("action", String(action));

    // Some backends also expect reason in the query for reject; keep it in body, but
    // it's safe to duplicate into query if present (won't break accept).
    if (action === "reject" && rest?.reason) {
      qs.set("reason", String(rest.reason));
    }

    // Build FormData from the rest (includes file for accept, and fields for both flows)
    const data = axios.toFormData(rest);

    // POST multipart/form-data (let axios set the boundary)
    return api.post(`${url}contract.php?${qs.toString()}`, data, multipart);
  };

  addExtraLoan = async (payload: FormData) =>
    api.post(`${url}extra_loan.php`, payload, multipart);

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

const relocationApis = new RelocationApis();
export default relocationApis;
