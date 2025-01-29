import api from "../../../services/api/base";

const url = "/login/member/dashboard/APIs/visa-processing/";
class VisaEndpoints {
  ds_160_application_video = async () => {
    const response = await api.get(
      `${url}/get-video.php?action=ds-160-application-video`
    );
    return response?.data?.data;
  };
  schools = async () => {
    return [];
  };
}
const visaEndpoints = new VisaEndpoints();
export default visaEndpoints;
