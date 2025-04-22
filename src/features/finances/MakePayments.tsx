import { useEffect, useState } from "react";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.tsx";
import SelectDropDown from "../../components/inputs/SelectDropDown.tsx";
import financeService from "../../services/api/finances.ts";
import useProgramFees from "../../services/hooks/useProgramFees.tsx";
import useFetchUser from "../../services/hooks/useFetchUser.tsx";
import Loader from "../../components/loaders/Loader.tsx";
import { useLocation } from "react-router";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import InputField from "../../components/inputs/InputField.tsx";
import ContentComponent from "../../components/ContentComponent.tsx";
import { formatCurrency } from "../../utils/utils.ts";

const paymentMethods = [
  { label: "M-Pesa", value: "mpesa" },
  { label: "Card", value: "card" },
  // { label: "Bank Transfer", value: "bank" },
];
function MakePayments() {
  const { state } = useLocation();
  const { user } = useFetchUser();
  const [amount, setAmount] = useState<number>();
  const { programFees, programFee, rates } = useProgramFees(state);
  const [purpose, setPurpose] = useState<string>("");
  const [number, setNumber] = useState<number>();
  const [paymentMethod, setPaymentMethod] = useState();

  useEffect(() => {
    if (programFee) {
      setAmount(programFee?.amount);
      setPurpose(programFee?.description);
    }
    console.log(state, "state");
  }, [programFee]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      email: user?.email,
      country: user?.country,
      purpose: purpose,
      amount: amount,
      payment_method: paymentMethod,
      mobile_num: number,
    };
    handlePayments.mutate(data);
  };
  const handlePayments = useMutation({
    mutationFn: async (data: any) => {
      if (data.payment_method === "card") {
        return await financeService.stripe(data);
      }
      if (data.payment_method === "mpesa") {
        return await financeService.mpesa({ ...data, amount_usd: amount });
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Payment failed");
    },
  });

  const handleChange = (event: any) => {
    const selectedOption = programFees.find(
      (option: any) => option.description === event.target.value
    );
    setPurpose(selectedOption.description);
    setAmount(selectedOption.amount);
  };

  if (!user || !programFees?.length) return <Loader />;

  return (
    <main className="">
      <ContentComponent
        header="Select a payment purpose and proceed to complete your payment."
        childrenClassName="col-"
      >
        {/* <p>Please select a payment purpose and proceed to complete your payment.</p> */}
        <form onSubmit={onSubmit} className="col w-full p-3">
          <div className="col my-3 w-full">
            <label>Select reason for payment</label>
            <Select value={purpose} onChange={handleChange}>
              {programFees?.map(({ description }: any) => (
                <MenuItem key={description} value={description}>
                  {description}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="col my-3 ">
            <label>Amount (USD)</label>
            <InputField
              name="amount"
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e: any) => setAmount(Number(e.target.value))}
              helperText={
                !amount
                  ? ""
                  : rates
                  ? "Amount in " + formatCurrency(rates * (amount || 0), "KES")
                  : "Converting..."
              }
            />
          </div>
          <div className="col my-3 w-full">
            <label>Choose means of payment</label>
            <SelectDropDown
              placeholder="Payment Method"
              display={(option: any) => (
                <p className="hover:text-primary-light p-1 cursor-pointer">
                  {option.label}
                </p>
              )}
              options={paymentMethods}
              helperText="Card supported Visa,Mastercard,American Express,UnionPay,Maestro,Japan Credit Bureau"
              onChange={(option) => setPaymentMethod(option?.value)}
              required
            />
          </div>
          {paymentMethod === "mpesa" && (
            <div className="col my-3 ">
              <label>Mpesa Number</label>
              <InputField
                placeholder="254 708 000 000"
                helperText="Include country code : 254 7***"
                type="number"
                error={false}
                value={number}
                onChange={(e: any) => setNumber(e.target.value)}
              />
            </div>
          )}

          <div className="h-[2vh]" />
          <button type="submit" className="primary-btn self-end">
            {handlePayments.isPending ? "Processing..." : "Make Payment"}
          </button>
        </form>
      </ContentComponent>
    </main>
  );
}

export default MakePayments;
