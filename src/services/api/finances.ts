import { toast } from "react-toastify";
import api, { baseDirectory } from "./base";

interface PaymentProps {
  email: any;
  purpose: any;
}
interface MpesaProps extends PaymentProps {
  mobile_num: any;
  amount_usd: any;
}
interface StripeProps extends PaymentProps {
  amount: any;
  payment_method: any;
  country: any;
}

class FinanceService {
  mpesa = async (data: MpesaProps) => {
    try {
      const response = await api.post("/mpesa_test/sendRequest.php", data);
      if (response.status === 200) {
        toast.success(response.data.success);
        return response.data;
      }
    } catch (error: any) {
      throw new Error(error.response);
    }
  };
  stripe = async (data: StripeProps) => {
    try {
      const response = await api.post("/payments/make_payments.php", data);
      if (response.status === 200 && response.data?.checkoutURL) {
        toast.success("Payment successfully sent");
        window.open(response.data.checkoutURL, "_blank");
        return response.data.checkoutURL;
      } else if (response.status === 200 && !response.data?.checkoutURL) {
        toast.error("Payment failed");
        throw new Error("No checkout URL returned from the server.");
      } else {
        toast.error("Payment failed");
        throw new Error("Failed to initiate payment.");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  programFees = async (fee?: string) =>
    await api.get(`${baseDirectory}/fetch_fees.php`, {
      params: {
        fee,
      },
    });

  getRates = () =>
    api.get(`${baseDirectory}/funding/fixerAPI.php`, {
      params: {
        action: "sell",
        to: "KES",
        from: "USD",
        amount: 1,
      },
    });
}
const financeService = new FinanceService();
export default financeService;
