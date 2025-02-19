import api from "../../../../services/api/base";

class ContractService {
  checkSchoolApplication = async () => {
    try {
      const url =
        "/login/member/dashboard/APIs/others/sign_consent.php?action=fetch_consent&consent_type=1";
      const response = await api.get(url);
      return response?.data.message[0];
    } catch (error) {
      console.error(error);
    }
  };
}
const contractService = new ContractService();
export default contractService;
