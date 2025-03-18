import api, {
  baseDirectory,
  multipart,
} from "../../../../../services/api/base";
import { fetchIp } from "../../../../../utils/utils";

const url = `${baseDirectory}funding/`;
const mpowerUrl = `${baseDirectory}loans/m-power.php?`;

class TuitionEndpoints {
  getStatus = async () => api.get(`${url}tuition_status.php`);

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
