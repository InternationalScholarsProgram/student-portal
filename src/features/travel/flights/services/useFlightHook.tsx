import { useQuery } from "@tanstack/react-query";
import api from "../../../../services/api/base";
import useAccountStatement from "../../../../services/hooks/useAccountStatement";

function useFlightHook() {
  const { accountStatements, user } = useAccountStatement();
  const { data: orderHistory } = useQuery({
    queryKey: ["flights", user?.email],
    queryFn: async () => {
      const response = await api.get(
        "/login/member/dashboard/flights/functions.php?action=fetch_orders"
      );
      console.log(response.data, "response");
      return response.data;
    },
  });

  return { orderHistory, user, accountStatements };
}
export default useFlightHook;
