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

  repaymentSchedule = (data: any) =>
    api.post(`${url}repayment_schedule.php`, {
      principal: data?.principal,
      annual_interest_rate: data?.interest,
      months: data?.term,
      first_date: data?.date_approved,
      second_date: data?.date_approved,
      loan_id: data?.loan_id,
    });
  
}
const relocationApis = new RelocationApis();
export default relocationApis;
