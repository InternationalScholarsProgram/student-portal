import axios from "axios";
import api, {
  activeStudentId,
  BASE_URL,
  baseDirectory,
  multipart,
} from "../../../../../services/api/base";
import { fetchIp } from "../../../../../utils/utils";

const url = `${baseDirectory}funding/`;
const mpowerUrl = `${baseDirectory}loans/m-power.php?`;
const tuitionUrl = `${url}/tuition_status.php`;

class TuitionEndpoints {
  getStatus = async () =>
    api.get(`${tuitionUrl}`, {
      params: {
        action: "track_status",
      },
    });

  uploadFundingOptions = async (payload: FormData) => {
    return await api.post(
      `${tuitionUrl}?action=upload_visa_support`,
      payload,
      multipart
    );
  };

  makeMpowerApplication = async (payload: FormData) => {
    const apiUrl = `${mpowerUrl}action=application_request`;
    return await api.post(apiUrl, payload, multipart);
  };
  trackMpowerLead = async () => {
    try {
      const apiUrl = `${baseDirectory}loans/m-power.php?action=track_lead`;
      const response = await api.post(apiUrl);
      return response?.data?.message?.data;
    } catch (error: any) {
      console.error("Error tracking Mpower lead:", error?.response?.data);
      return null;
    }
  };
  mpowerStatus = async (id: string) => {
    return api.get(`${url}mpower_status.php?app_id=${id}`);
  };
  test = async (params: any) => {
    return fetchIp();
  };
}
const tuitionEndpoints = new TuitionEndpoints();
export default tuitionEndpoints;
