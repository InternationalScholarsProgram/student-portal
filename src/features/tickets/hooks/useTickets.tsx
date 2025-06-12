import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api, { baseDirectory } from "../../../services/api/base";
import { json2formData } from "../../../utils/utils";
import useFetchUser from "../../../services/hooks/useFetchUser";
import { toast } from "react-toastify";
import { getTicketsUrl, ticketsUrl } from "../components/utils";

function useTickets() {
  const { user } = useFetchUser();
  const queryKey = ["yourTickets", user?.email];
  const queryClient = useQueryClient();
  const inValidate = () =>
    queryClient.invalidateQueries({ queryKey: queryKey });

  const { data: allTickets, isLoading: isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await api.get(`${getTicketsUrl}action=my_tickets`);
      const resData = response.data;
      if (resData.code === 200) return resData.data;
      return response.data.data;
    },
    select: (response) => response as TicketProps[],
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
        baseDirectory + "/tickets/create_ticket.php",
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success === true) {
        inValidate();
        toast.success("Ticket created successfully!");
      }
      console.log(data, "data");
    },
  });
  const readNotification = useMutation({
    mutationFn: async (ticket_id: string) => {
      const response = await api.get(
        `${getTicketsUrl}action=read_notif&ticket_id=${ticket_id}`
      );
      return response.status;
    },
    onSuccess: (status) => {
      if (status === 200) inValidate();
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (data: any) => {
      const payload = json2formData(data);
      const response = await api.post(
        `${ticketsUrl}/send_message.php`,
        payload
      );
      return { ...response?.data, queryKey: data?.queryKey };
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        toast.success("Message sent");
        queryClient.invalidateQueries({ queryKey: data?.queryKey });
      }
    },
  });

  return {
    allTickets,
    closedTickets,
    openTickets,
    isLoading,
    createTicket,
    readNotification,
    sendMessage,
    queryClient,
  };
}

export default useTickets;
type TicketProps = {
  action: number;
  category: string;
  feedback: null;
  id: number;
  img: null;
  issue: string;
  phone: string;
  status: string;
  ticket_date: string;
  unread_count: number;
  unread_notifications: any[];
};
