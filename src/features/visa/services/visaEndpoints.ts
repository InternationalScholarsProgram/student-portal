import api from "../../../services/api/base";
import { fetchIp, formData2json, json2formData } from "../../../utils/utils";
import { Counter, Transcripts, VisaVideos } from "../types/visaTypes";

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
  visaTrainingVideo = async () => {
    const response = await api.get(
      `${url}/get-video.php?action=visa_training_videos`
    );
    return response?.data?.data as VisaVideos;
  };
  visaTranscript = async () => {
    const response = await api.get(
      `${url}/get-video.php?action=visa_transcripts`
    );
    console.log(response?.data?.data, "response");

    return response?.data?.data as Transcripts;
  };
  ds160RequestReview = async (data: any) => {
    const payload = formData2json(data);
    const response = await api.post(`${url}/ds160_request_review.php`, payload);
    return response?.data;
  };
  payments = async (data: any) => {
    return api.post(`${url}/payment.php`, data);
  };
  updateCounter = async (counter: Counter) => {
    return api.get(`${url}/counters.php?counter=${counter}`);
  };
  getMockQuestions = async (id: number) => {
    const response = api.get(`${url}/mock_questions.php?visa_id=${id}`);
    return (await response).data.data;
  };
  requestVisaTrainingResources = async (data: any) => {
    return api.post(`${url}request_visa_training.php`, data);
  };
  uploadSupportLetter = async (data: any) => {
    console.log(data, "data");
    return api.post(`${url}upload_support_letter.php`, data);
  };
  test = async (data?: any) => {
    return await fetchIp();
  };
}
const visaEndpoints = new VisaEndpoints();
export default visaEndpoints;
