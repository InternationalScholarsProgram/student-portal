import { useQuery } from "@tanstack/react-query";
import useFetchUser from "../../../../services/hooks/useFetchUser";
import api from "../../../../services/api/base";

function useFlightHook() {
  const { user } = useFetchUser();
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

  return { orderHistory };
}
export default useFlightHook;
