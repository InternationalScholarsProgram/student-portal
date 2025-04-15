import api, {
  baseDirectory,
  multipart,
} from "../../../../../services/api/base";
import { fetchIp, testEndpoint } from "../../../../../utils/utils";

const url = `${baseDirectory}funding/tuition`;
const sallieMaeUrl = `${url}salliemae.php`;
const mpowerUrl = `${url}m-power.php`;
const tuitionUrl = `${url}/tuition_status.php`;

class TuitionEndpoints {
  getStatus = () => api.get(tuitionUrl + "?action=track_status");
  requestCreditReiew = () =>
    api.post(url + "functions.php?action=request_credit_review", multipart);

  uploadFundingOptions = async (payload: FormData) => {
    return await api.post(
      `${tuitionUrl}?action=upload_visa_support`,
      payload,
      multipart
    );
  };

  makeMpowerApplication = async (payload: FormData) => {
    const apiUrl = `${mpowerUrl}?action=application_request`;
    return await api.post(apiUrl, payload, multipart);
  };

  bookSubsequentMeeting = (reason: string) =>
    api.get(
      `${url}/functions.php?action=request_subsequent_meeting&meeting_reason=${reason}`
    );

  getSubsequentMeeting = async () => {
    return await api.get(`${url}/functions.php?action=meeting_status`);
  };

  trackMpowerLead = () => api.post(`${mpowerUrl}?action=track_lead`);

  salliemae = (id: string) => api.get(`${sallieMaeUrl}?app_id=${id}`);

  getCosigners = (id: string) =>
    api.get(`${sallieMaeUrl}?app_id=${id}&action=fetch_cosigner`);

  uploadCosigner = async (params: any) =>
    api.get(sallieMaeUrl, {
      params: { ...params, action: "submit_cosigner" },
    });
  sallieMaeApplication = async (payload: FormData) => {
    return await api.post(
      sallieMaeUrl + "?action=submit_application",
      payload,
      multipart
    );
  };
  loanFeedback = (payload: FormData) =>
    api.post(`${url}/loan_app_feedback.php`, payload, multipart);

  test = (params: any) => {
    return fetchIp();
  };
}
const tuitionEndpoints = new TuitionEndpoints();
export default tuitionEndpoints;