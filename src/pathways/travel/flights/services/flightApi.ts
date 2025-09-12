import { toast } from "react-toastify";
import api from "../../../../services/api/base";
import { json2formData } from "../../../../utils/utils";
import { filterFlights } from "../components/utils";

const flightsApiUrl = `/login/member/dashboard/flights/functions.php`;

class FlightApi {
  fetchAirports = async (keyword?: string) => {
    if (!keyword) return [];
    try {
      const response = await api.get(
        `/login/member/dashboard/flights/api/search_airport.php`,
        {
          params: {
            query: keyword,
          },
        }
      );
      const data = await response.data.data;
      return data;
    } catch (error: any) {
      console.error(error.response.data);
      return [];
    }
  };
  fetchSchoolAirport = async (school?: string) => {
    if (!school) return [];
    try {
      const response = await api.get(
        `/login/member/dashboard/flights/functions.php?action=fetch_schools&qry=${school}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  searchFlights = async function (departureDate: string, from: any, to: any) {
    const url = `/login/member/dashboard/flights/api/search_flights.php`;
    const req = {
      departure_date: departureDate,
      origin: from?.iata_code || "NBO",
      destination: to?.iata_code || "JFK",
    };
    try {
      const response = await api.post(url, req);
      const data = await response.data.data;

      const offers = data.offers.filter(
        (offer: any) =>
          offer.payment_requirements.requires_instant_payment === false
      );
      const filteredFlights = filterFlights(offers);
      console.log(filteredFlights, "\n");

      return filteredFlights;
    } catch (error: any) {
      console.error(error.response.data);
      return [];
    }
  };
  fetchOrderById = async (orderId: string) => {
    try {
      const response = await api.get(
        `/login/member/dashboard/flights/api/get_order.php?order_id=${orderId}`
      );
      return response.data.data;
    } catch (error: any) {
      console.error(error.response.data);
    }
  };
  bookFlight = async (reqData: any) => {
    try {
      const payload = json2formData(reqData);
      const savingResponse = await api.post(
        "/login/member/dashboard/flights/functions.php?action=book_flight",
        payload
      );
      if (savingResponse?.data?.code === "201") {
        toast.success("Booking Request successfully made");
        return true;
      }
    } catch (error: any) {
      console.error(error.response.data);
      toast.error(error.response?.data?.message);
      return error.response.data;
    }
  };
}
const flightApi = new FlightApi();
export default flightApi;
