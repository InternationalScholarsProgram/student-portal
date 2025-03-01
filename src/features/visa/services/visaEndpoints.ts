import api from "../../../services/api/base";
import { fetchIp, formData2json, json2formData } from "../../../utils/utils";
import { Counter } from "../types/visaTypes";

const url = "/login/member/dashboard/APIs/visa-processing/";
class VisaEndpoints {
  requestDs160TrainingResources = async (data: any) => {
    const payload = json2formData(data);
    return api.post(`${url}request_ds160_training_videos.php`, payload);
  };
  status = async () => {
    const response = await api.get(`${url}/status.php?action=all`);
    return response?.data?.data;
  };
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
  visaPayments = async (data: any) => {
    return api.post(`${url}/visa_payment.php`, data);
  };
  updateCounter = async (counter: Counter) => {
    return api.get(`${url}/counters.php?counter=${counter}`);
  };
  requestVisaTrainingResources = async (data: any) => {
    return api.post(`${url}request_visa_training.php`, data);
  };
  test = async (data?: any) => {
    return await fetchIp();
  };
}
const visaEndpoints = new VisaEndpoints();
export default visaEndpoints;
