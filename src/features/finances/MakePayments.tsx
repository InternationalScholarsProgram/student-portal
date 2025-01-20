import { useEffect, useState } from "react";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.tsx";
import SelectDropDown from "../../components/autocomplete/SelectDropDown.tsx";
import financeService from "../../services/api/finances.ts";
import useProgramFees from "../../services/hooks/useProgramFees.tsx";
import useFetchUser from "../../services/hooks/useFetchUser.tsx";
import Loader from "../../components/loaders/Loader.tsx";
import { useLocation } from "react-router";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import InputField from "../../components/InputField.tsx";

const paymentMethods = [
  { label: "M-Pesa", value: "mpesa" },
  { label: "Card", value: "card" },
  // { label: "Bank Transfer", value: "bank" },
];
function MakePayments() {
  const { state } = useLocation();
  const [amount, setAmount] = useState<number>();
  const [purpose, setPurpose] = useState<string>("");
  const [number, setNumber] = useState<number>();
  const [paymentMethod, setPaymentMethod] = useState();
  const { programFees, programFee } = useProgramFees(state);
  const { user } = useFetchUser();

  useEffect(() => {
    if (programFee) {
      setAmount(programFee[0]?.amount);
      setPurpose(programFee[0]?.description);
    }
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

  if (!user || !programFees) return <Loader />;

  return (
    <main className="">
        <p>Proceed to make payment</p>
      <section className="card min-w-fit p-3 sm:px-[5%] my-[2vh] self-center col justify-center">

        <form onSubmit={onSubmit} className="col w-full px-3 sm:px-[5%]">
          <div className="col my-3 w-full">
            <label>Select reason for payment</label>
            <Select
              value={purpose}
              onChange={handleChange}
              placeholder="Select reason"
            >
              {programFees.map(({ description }: any) => (
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
              onChange={(e: any) => setAmount(e.target.value)}
            />
            {/* <p className="text-sm px-3 font-light opacity-80">
              Amount (KES) :{" "}
              <span className="text-secondary-light">
                {Intl.NumberFormat("en-KE", {
                  style: "currency",
                  currency: "KES",
                  minimumFractionDigits: 0, // No decimal places
                  maximumFractionDigits: 0, // No decimal places
                }).format(rates * amount)}
              </span>
            </p> */}
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

          <PrimaryBtn
            type="submit"
            btnstyles="min-w-[10vw]  min-h-[4vh] my-4 px-[2vw] self-end"
          >
            {handlePayments.isPending ? "Processing..." : "Make Payment"}
          </PrimaryBtn>
        </form>
      </section>
    </main>
  );
}

export default MakePayments;

// const proceedToPay = async () => {
//   const email = formData.email; // Get from state
//   const country = formData.country; // Get from state

//   setIsRedirecting(true);

//   try {
//     if (country === "Kenya") {
//       // Redirect to the Kenyapay.tsx route
//       navigate("/makepayment", {
//         state: {
//           email,
//           country,
//           purpose: "Application fee",
//           amount: 10,
//           payment_method: "card",
//         },
//       });
//     } else {
//       // Call the API for external payment
//       const response = await axios.post(
//         "https://internationalscholars.qhtestingserver.com/payments/make_payments.php",
//         {
//           email,
//           country,
//           purpose: "Application fee",
//           amount: 20,
//           payment_method: "card",
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (response.status === 200 && response.data?.checkoutURL) {
//         // Redirect user to the Stripe checkout session
//         window.open(response.data.checkoutURL, "_blank");
//       } else if (response.status === 200 && !response.data?.checkoutURL) {
//         throw new Error("No checkout URL returned from the server.");
//       } else {
//         throw new Error("Failed to initiate payment.");
//       }
//     }
//   } catch (error) {
//     // console.error("Error proceeding to pay:", error);
//     setSnackbarMessage("An error occurred. Please try again.");
//     setSnackbarSeverity("error");
//     setOpenSnackbar(true);
//   } finally {
//     setIsRedirecting(false); // Reset to false after completion
//   }
// };
