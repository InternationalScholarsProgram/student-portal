import { toast } from "react-toastify";
import api from "./base";

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
  programFees = async (fee?: string) => {
    try {
      const response = await api.get(
        `/login/member/dashboard/APIs/fetch_fees.php`,
        {
          params: {
            fee,
          },
        }
      );
      if (response.data?.status === "success") {
        return response?.data?.message;
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Error fetching user:", error.response.data);
      return null;
    }
  };
  getRates = async () => {
    try {
      const response = await api.get(
        "http://data.fixer.io/api/latest?access_key=86361b4bffefe0b143429f170227ed76"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}
const financeService = new FinanceService();
export default financeService;
