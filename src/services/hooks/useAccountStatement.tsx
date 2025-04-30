import { useQuery } from "@tanstack/react-query";
import api, { baseDirectory } from "../api/base";
import useFetchUser from "./useFetchUser";

function useAccountStatement() {
  const { user, isLoading: userLoading } = useFetchUser();

  const {
    data: accountStatements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["account-statement", user?.email],
    queryFn: async () => {
      try {
        const response = await api.post(baseDirectory + "fetch_statement.php", {
          email: user?.email,
        });
        return response.data;
      } catch (error: any) {
        console.error("Error fetching user:", error.response.data);
        throw new Error("Failed to fetch user data.");
      }
    },
    enabled: !!user?.email,
    select: (data) => ({
      ...data,
      balance: data?.total_payment - data?.total_expenditure,
    }),
  });

  return {
    user,
    accountStatements,
    isLoading,
    userLoading,
    error,
  };
}

export default useAccountStatement;
