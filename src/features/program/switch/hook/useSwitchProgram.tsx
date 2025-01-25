import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import api, { baseDirectory } from "../../../../services/api/base";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const url = `${baseDirectory}/program_options/switch_package.php`;

function useSwitchProgram() {
  const { user, userQueryKey } = useFetchUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: status } = useQuery({
    queryKey: ["required-pay", user?.email],
    queryFn: async () => {
      const response = await api.get(`${url}?action=check_balance`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleSwitch = useMutation({
    mutationFn: async (program: string) => {
      try {
        const response = await api.get(url, {
          params: {
            action: "switch_package",
            switch_to: program,
          },
        });
        return response.data;
      } catch (error: any) {
        throw new Error(error.response);
      }
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.code === 200) {
        toast.success("Program successfully switched.");
        navigate("/contract/onboarding-agreement", {
          state: data?.data,
        });
        queryClient.invalidateQueries({ queryKey: userQueryKey });
      }
    },
    onError: () => toast.error("Failed to switch program."),
  });
  
  return {
    status,
    requiredPay: status?.data?.deficit,
    programOption: user?.package?.toLowerCase(),
    balance: status?.data?.balance,
    handleSwitch,
  };
}

export default useSwitchProgram;
