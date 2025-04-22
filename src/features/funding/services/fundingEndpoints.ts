import api, { baseDirectory } from "../../../services/api/base";

const url = `${baseDirectory}funding/`;

class FundingEndpoints {
  getStatus = async () => {
    const response = await api.get(`${url}tuition_status.php`);
    return response.data;
  };
  loanApplication = async (data: any) => {
    const response = await api.post(`${url}application_details.php`, data);
    return response.data;
  };
  applicationDetails = async (data: any) => {
    const response = await api.post(`${url}application_details.php`, data);
    return response.data;
  };
  getApplicationDetails = () => api.get(`${url}application_details.php`);
}
const fundingEndpoints = new FundingEndpoints();
export default fundingEndpoints;
