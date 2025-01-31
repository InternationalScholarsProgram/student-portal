import api from "../../../services/api/base";
import { fetchIp, formData2json, json2formData } from "../../../utils/utils";

const url = "/login/member/dashboard/APIs/visa-processing/";
class VisaEndpoints {
  ds_160_application_video = async () => {
    const response = await api.get(
      `${url}/get-video.php?action=ds-160-application-video`
    );
    return response?.data?.data;
  };
  ds160RequestReview = async (data: any) => {
    const payload = formData2json(data);
    const response = await api.post(`${url}/ds160_request_review.php`, payload);
    return response?.data;
  };
  schools = async () => {
    const response = await api.get(`${url}schools.php`);
    return response?.data?.data;
  };
  requestVisaTrainingResources = async (data: any) => {
    const payload = json2formData(data);
    const response = await api.post(`${url}schools.php`, payload);
    return response?.data?.data;
  };
  test = async () => {
    const response = await fetchIp();
    return response;
  };
}
const visaEndpoints = new VisaEndpoints();
export default visaEndpoints;
