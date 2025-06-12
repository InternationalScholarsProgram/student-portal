import { useQuery } from "@tanstack/react-query";
import api from "../../../../services/api/base";
import useAccountStatement from "../../../../services/hooks/useAccountStatement";

function useFlightHook() {
  const { accountStatements, user } = useAccountStatement();
  const { data: orderHistory = [], isLoading } = useQuery({
    queryKey: ["flights", user?.email],
    queryFn: () =>
      api.get(
        "/login/member/dashboard/flights/functions.php?action=fetch_orders"
      ),
    select: (response) => response?.data as TravelBooking[],
  });

  return { orderHistory, user, accountStatements, isLoading };
}

export default useFlightHook;

type TravelBooking = {
  airline_link: string;
  amount_paid: string; // You can change this to number if it's always numeric
  arrival_time: string;
  booking_reference: string;
  comments: string;
  contact: string;
  departure_airport: string;
  departure_time: string;
  destination_airport: string;
  flight_link: string;
  itinerary: string;
  order_id: string;
  status: string;
  ticket_fare: string; // Consider changing to number if numeric
  visa: string;
};
