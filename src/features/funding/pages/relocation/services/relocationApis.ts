import axios from "axios";
import api, {
  baseDirectory,
  multipart,
} from "../../../../../services/api/base";
import getStripe from "../../../../../services/stripe";

const url = `${baseDirectory}funding/relocation/`;

class RelocationApis {
  application = (payload: FormData) =>
    api.post(`${url}application.php`, payload, multipart);

  decision = (payload: FormData) =>
    api.post(`${url}desicion.php`, payload, multipart);

  status = () => api.get(`${url}status.php`);
  repaymentSchedule = (data: any) =>
    api.post(`${url}repayment_schedule.php`, {
      principal: data?.principal,
      annual_interest_rate: data?.interest,
      months: data?.term,
      first_date: data?.date_approved,
      second_date: data?.date_approved,
      loan_id: data?.loan_id,
    });
  signContract = (payload: any) => {
    const data = axios.toFormData(payload);
    console.log(data);

    return api.post(`${url}contract.php`, data, multipart);
  };
  updateBankDetails = async (_payload: FormData) => {
    const payload: any = axios.formToJSON(_payload);
    const response = await api.post(`${url}update_bank.php`, _payload); // get customer_id , and client secret
    const stripeReqData = await response?.data?.data;

    const stripe = await getStripe();
    if (!stripe) return null;
    const result = await stripe.collectFinancialConnectionsAccounts({
      clientSecret: stripeReqData?.client_secret,
    });
    if (result.error) throw new Error(result.error.message);

    return api.post(baseDirectory + "funding/process_subscription.php", {
      customer_id: stripeReqData?.customer_id,
      bank_account_id: result?.financialConnectionsSession.accounts[0].id,
      member_no: payload?.member_no,
      fullnames: payload?.fullnames,
      loan_id: payload?.loan_id,
      loan_type: "relocation",
    });
  };
  addExtraLoan = async (payload: FormData) =>
    api.post(`${url}extra_loan.php`, payload, multipart);
}
const relocationApis = new RelocationApis();
export default relocationApis;
