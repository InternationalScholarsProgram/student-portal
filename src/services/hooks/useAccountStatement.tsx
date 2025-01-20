import { useQuery } from "@tanstack/react-query";
import api from "../api/base";
import useFetchUser from "./useFetchUser";

function useAccountStatement() {
  const { user } = useFetchUser();
  const {
    data: accountStatements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["account-statement", user?.email],
    queryFn: async () => {
      try {
        const response = await api.post(
          "/login/member/dashboard/APIs/fetch_statement.php",
          {
            email: user?.email,
          }
        );
        return response.data;
      } catch (error: any) {
        console.error("Error fetching user:", error.response.data);
        throw new Error("Failed to fetch user data.");
      }
    },
    enabled: !!user?.email,
  });
  const balance =
    accountStatements?.total_payment - accountStatements?.total_expenditure;

  return {
    user,
    accountStatements: { ...accountStatements, balance },
    isLoading,
    error,
  };
}

export default useAccountStatement;
