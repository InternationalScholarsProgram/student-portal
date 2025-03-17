import api, { baseDirectory } from "../../../../../services/api/base";
import { fetchIp } from "../../../../../utils/utils";
const url = `${baseDirectory}funding/`;

class TuitionEndpoints {
  uploadMpower = async (data: FormData) => {
    return api.post(`${url}tuition_status.php`, data);
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
  test= async (params:any) => {
    return fetchIp()
  }
}
const tuitionEndpoints = new TuitionEndpoints();
export default tuitionEndpoints;
