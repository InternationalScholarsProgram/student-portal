import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api/base";
import { json2formData } from "../../../utils/utils";
import useFetchUser from "../../../services/hooks/useFetchUser";
import { toast } from "react-toastify";
import { getTicketsUrl } from "../components/utils";

function useTickets() {
  const { user } = useFetchUser();
  const queryKey = ["yourTickets", user?.email];
  const queryClient = useQueryClient();

  const { data: allTickets, isLoading: isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await api.get(`${getTicketsUrl}action=my_tickets`);
      const resData = response.data;
      if (resData.code === 200) return resData.data;
      return response.data.data;
    },
  });

  const closedTickets = allTickets?.filter(
    (ticket: any) => ticket.status === "closed"
  );
  const openTickets = allTickets?.filter(
    (ticket: any) => ticket.status !== "closed"
  );

  const createTicket = useMutation({
    mutationFn: async (data: any) => {
      const payload = json2formData(data);
      const response = await api.post(
        "/login/member/dashboard/APIs/tickets/create_ticket.php",
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success === true) {
        queryClient.invalidateQueries({ queryKey: queryKey });
        toast.success("Ticket created successfully!");
      }
      console.log(data, "data");
    },
  });

  return {
    allTickets,
    closedTickets,
    openTickets,
    isLoading,
    createTicket,
  };
}

export default useTickets;
