import axios from "axios";
import api, {
  baseDirectory,
  multipart,
} from "../../../../../../services/api/base";

const url = `${baseDirectory}funding/relocation/`;

class RelocationApis {
  application = (payload: FormData) =>
    api.post(`${url}application.php`, payload, multipart);

  decision = (payload: FormData) =>
    api.post(`${url}desicion.php`, payload, multipart);

  status = () => api.get(`${url}status.php`);

  signContract = (payload: any) => {
    const data = axios.toFormData(payload);
    return api.post(`${url}contract.php`, data, multipart);
  };

  addExtraLoan = async (payload: FormData) =>
    api.post(`${url}extra_loan.php`, payload, multipart);
}
const relocationApis = new RelocationApis();
export default relocationApis;
