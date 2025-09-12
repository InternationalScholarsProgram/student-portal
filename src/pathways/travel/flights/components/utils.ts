import dayjs from "dayjs";
import flightApi from "../services/flightApi";

const tabs = ["Guide","Find Flights", "History"];

const filterFlights = (flights: any) => {
  return flights.filter((flight: any) => {
    const slices = flight.slices || [];
    let europeanStops = 0;
    let hasCanadaStop = false;

    // Check each stop in the slices
    for (const slice of slices) {
      const segments = slice.segments || [];
      for (const segment of segments) {
        const stopCountry = segment.destination?.iata_country_code || "";

        // Check if the stop is in Canada
        if (stopCountry === "CA") {
          hasCanadaStop = true;
          break;
        }

        // Check if the stop is in a European nation
        if (EUROPEAN_NATIONS.includes(stopCountry)) {
          europeanStops++;
        }
      }
    }

    // Exclude flights with more than one European stop or any stop in Canada
    return europeanStops <= 1 && !hasCanadaStop;
  });
};
function getTimeOfDay(dateTime: any) {
  // Create a Date object from the date-time string
  const date = new Date(dateTime);

  // Ensure that the Date object was created properly
  if (isNaN(date.getTime())) {
    // Handle invalid date formats
    return "";
  }

  // Get the hour from the date object (in 24-hour format)
  const hour = date.getHours();

  // Determine the time of day based on the conditions
  if (hour >= 0 && hour <= 4) {
    return "EARLY_MORNING"; // 12:00am - 4:59am
  }
  if (hour >= 5 && hour <= 11) {
    return "MORNING"; // 5:00am - 11:59am
  }
  if (hour >= 12 && hour <= 17) {
    return "AFTERNOON"; // 12:00pm - 5:59pm
  }
  if (hour >= 18 && hour <= 23) {
    return "EVENING"; // 6:00pm - 11:59pm
  }

  // Fallback (shouldn't be reached)
  return "";
}

const convertDuration = (duration: string) =>
  duration
    .replace("P", "")
    .replace("T", " ")
    .replace("D", "d ")
    .replace("H", "h ")
    .replace("M", "m");

const getDates = (date: any) => {
  const departureDate = dayjs(date);
  const today = dayjs().startOf("day");
  const generatedDates: any[] = [];

  // Calculate 3 days before and 3 days after the departure date
  for (let i = -3; i <= 3; i++) {
    const potentialDate = departureDate.add(i, "day");

    if (potentialDate.isBefore(today)) {
      // Shift dates before today to after the departure date
      const adjustedDate = departureDate.add(7 - Math.abs(i), "day");
      generatedDates.push({
        date: adjustedDate.format("YYYY-MM-DD"),
        price: null,
      });
    } else {
      generatedDates.push({
        date: potentialDate.format("YYYY-MM-DD"),
        price: null,
      });
    }
  }

  // Sort the dates in chronological order
  return generatedDates.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

const fetchCheapDates = async (formData: any) => {
  const generatedDates: any = getDates(formData?.travelDate);

  // Fetch flight data for all dates
  const flightPromises = generatedDates.map((day: any) =>
    flightApi.searchFlights(
      day.date,
      formData?.departure,
      formData?.destination
    )
  );
  const flightResults = await Promise.allSettled(flightPromises);

  console.log(flightResults, "flightResults");

  // Update dates with flight data
  flightResults.forEach((result, index) => {
    if (result.status === "fulfilled" && result.value.length > 0) {
      const cheapestFlight = result.value[0].total_amount;
      generatedDates[index].price = cheapestFlight;
      generatedDates[index].offers = [...result.value];
    }
  });

  // Find the cheapest flight
  const cheapest = generatedDates.reduce(
    (cheapest: any, current: any) => {
      if (current.price == null) return cheapest;
      return current.price < (cheapest.price || Infinity) ? current : cheapest;
    },
    { date: null, price: null }
  );
  const travelDateDay = dayjs(formData?.travelDate).format("YYYY-MM-DD");
  const travelDateData = generatedDates.find(
    (date: any) => date.date === travelDateDay
  );

  return {
    dates: generatedDates,
    cheapestDate: cheapest,
    travelDate: travelDateData,
  };
};

export {
  tabs,
  getTimeOfDay,
  filterFlights,
  convertDuration,
  getDates,
  fetchCheapDates,
};
const EUROPEAN_NATIONS = [
  "AT", // Austria
  "BE", // Belgium
  "BG", // Bulgaria
  "HR", // Croatia
  "CY", // Cyprus
  "CZ", // Czech Republic
  "DK", // Denmark
  "EE", // Estonia
  "FI", // Finland
  "FR", // France
  "DE", // Germany
  "GR", // Greece
  "HU", // Hungary
  "IS", // Iceland
  "IE", // Ireland
  "IT", // Italy
  "LV", // Latvia
  "LT", // Lithuania
  "LU", // Luxembourg
  "MT", // Malta
  "NL", // Netherlands
  "NO", // Norway
  "PL", // Poland
  "PT", // Portugal
  "RO", // Romania
  "SK", // Slovakia
  "SI", // Slovenia
  "ES", // Spain
  "SE", // Sweden
  "CH", // Switzerland
  "GB", // United Kingdom
];
