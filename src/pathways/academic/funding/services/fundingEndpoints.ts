import axios from "axios";
import api, { baseDirectory, multipart } from "../../../../services/api/base";
import getStripe from "../../../../services/stripe";
import { getLabels } from "../../../../router/utils";
import { getLoanType } from "../utils";

const url = `${baseDirectory}funding/`;

class FundingEndpoints {
  getStatus = async () => {
    const response = await api.get(`${url}tuition_status.php`);
    return response.data;
  };

  loanApplication = async (data: FormData) =>
    api.post(`${url}application_details.php`, data, multipart);

  applicationDetails = async (data: any) => {
    const response = await api.post(`${url}application_details.php`, data);
    return response.data;
  };

  getApplicationDetails = () => api.get(`${url}application_details.php`);

  updateBankDetails = async (_payload: FormData) => {
    const payload: any = axios.formToJSON(_payload);
    const response = await api.post(`${url}update_bank.php`, _payload);
    const stripeReqData = await response?.data?.data;

    const stripe = await getStripe();
    if (!stripe) return null;
    const result = await stripe.collectFinancialConnectionsAccounts({
      clientSecret: stripeReqData?.client_secret,
    });
    if (result.error) throw new Error(result.error.message);

    return api.post(`${url}/process_subscription.php`, {
      customer_id: stripeReqData?.customer_id,
      bank_account_id: result?.financialConnectionsSession.accounts[0].id,
      member_no: payload?.member_no,
      fullnames: payload?.fullnames,
      loan_id: payload?.loan_id,
      loan_type: getLoanType(payload?.loanType),
    });
  };

  repaymentSchedule = (data: any) =>
    api.post(`${url}repayment_schedule.php`, {
      principal: data?.principal,
      annual_interest_rate: data?.interest,
      months: data?.term,
      first_date: data?.date_approved,
      second_date: data?.date_approved,
      loan_id: data?.loan_id,
    });

  getLoanBalance = (loanId: string | number) =>
    api.get(`${url}balance.php`, { params: { loan_id: loanId } });

  initManualPayment = (payload: {
    payment_amount: number;
    email: string;
    loan_id: string | number;
  }) => {
    const fd = new FormData();
    fd.append("payment_amount", String(payload.payment_amount));
    fd.append("email", payload.email);
    fd.append("loan_id", String(payload.loan_id));
    return api.post(`${url}payment_api.php?action=init`, fd, multipart);
  };

  verifyPaymentStatus = (params: { session_id: string; loan_id: string | number }) =>
    api.get(`${url}payment_api.php`, {
      params: { action: "status", session_id: params.session_id, loan_id: params.loan_id },
    });


  signContract = (payload: ContractPayload) => {
    const data = axios.toFormData(payload);
    return api.post(`${url}contract.php`, data, multipart);
  };
}

const fundingEndpoints = new FundingEndpoints();
export default fundingEndpoints;

type ContractPayload = {
  ip: string;
  city: string;
  country_name: string;
  loan_id: string;
  stu_name: string;
  loan_type: number;
  contract: File;
};
