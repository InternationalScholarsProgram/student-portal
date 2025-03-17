import api, { baseDirectory } from "../../../services/api/base";

const url = `${baseDirectory}funding/`;

class FundingEndpoints {
  getStatus = async () => {
    const response = await api.get(`${url}tuition_status.php`);
    return response.data;
  };
}
const fundingEndpoints = new FundingEndpoints();
export default fundingEndpoints;
