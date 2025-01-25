import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api/base";
import { json2formData } from "../../../utils/utils";
import useFetchUser from "../../../services/hooks/useFetchUser";
import { toast } from "react-toastify";

function useTickets() {
  const { user } = useFetchUser();
  const queryKey = ["yourTickets", user?.email];

  const queryClient = useQueryClient();
  const { data: closedTickets, isLoading: closedLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await api.get(
        "/login/member/dashboard/APIs/tickets/get_tickets.php?action=closed_tickets"
      );
      return response.data.data;
    },
  });
  const { data: openTickets, isLoading: openIsLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await api.get(
        "/login/member/dashboard/APIs/tickets/get_tickets.php?action=open_tickets"
      );
      return response.data.data;
    },
  });
  const { data: allTickets, isLoading: isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await api.get(
        "/login/member/dashboard/APIs/tickets/get_tickets.php?action=all_tickets"
      );
      return response.data.data;
    },
  });
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
    closedTickets,
    closedLoading,
    openTickets,
    openIsLoading,
    isLoading,
    createTicket,
    allTickets,
  };
}

export default useTickets;
