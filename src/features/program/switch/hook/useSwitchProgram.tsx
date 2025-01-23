import { useEffect, useState } from "react";
import useAccountStatement from "../../../../services/hooks/useAccountStatement";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import api, { baseDirectory } from "../../../../services/api/base";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function useSwitchProgram() {
  const { user, accountStatements }: any = useAccountStatement();
  const [requiredPay, setRequiredPay] = useState(0);
  
  const { userQueryKey } = useFetchUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const totalPayment = accountStatements?.total_payment;
  const totalExpenditure = accountStatements?.total_expenditure;
  const calculatedBalance = accountStatements?.balance;

  const getRequredPay = () => {
    let calculatedRequiredPay = 0;
    if (totalPayment === 620) {
      console.log("here");

      calculatedRequiredPay = 1000;
    } else if (totalPayment === 1120) {
      console.log("here");
      calculatedRequiredPay =
        totalExpenditure > 620 ? totalExpenditure - 620 + 500 : 500;
    } else if (totalPayment > 1620 && calculatedBalance < 500) {
      console.log("here");
      calculatedRequiredPay = 500 - calculatedBalance;
    } else if (totalPayment > 1120 && totalPayment < 1620) {
      console.log("here");
      calculatedRequiredPay = 1000 - calculatedBalance;
    }
    setRequiredPay(calculatedRequiredPay);
  };

  const handleSwitch = useMutation({
    mutationFn: async () => {
      try {
        const response = await api.get(`${baseDirectory}/program_options/switch_package.php`);
        console.log(response.data);
        if (response.status === 200) {
          toast.success("Program successfully switched.");
          navigate("/contract/onboarding-agreement", {
            state: response?.data?.data,
          });
        }
        // 
        navigate("/contract/onboarding-agreement", {
          state: {
            token : "test Token",
          },
        });
        // 
        return response.data;
      } catch (error: any) {
        throw new Error(error.response);
      }
    },
    onSuccess: (res) => {
      if (res?.success)
        queryClient.invalidateQueries({ queryKey: userQueryKey });
    },
    onError: () => toast.error("Failed to switch program."),
  });

  useEffect(() => {
    if (calculatedBalance) getRequredPay();
    // console.log(user?.package, calculatedBalance, requiredPay);
    console.log("totalPayment", totalPayment);
    console.log("totalExpenditure", totalExpenditure);
    console.log("calculatedBalance", calculatedBalance);
  }, [user?.package, calculatedBalance]);

  return {
    requiredPay,
    handleSwitch,
    programOption: user?.package,
    calculatedBalance,
  };
}

export default useSwitchProgram;
