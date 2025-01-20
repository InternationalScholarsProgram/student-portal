import dayjs from "dayjs";

const tabs = ["Flights", "History"];

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
function getTimeOfDay(dateTime: string) {
  // Create a Date object from the date-time string
  console.log(dateTime);
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

// async function displayCheapDate(dates: any[], travelDate: any) {
//   const departureDate = dayjs(travelDate?.value);
//   const today = dayjs().startOf("day");

//   // Calculate 3 days before and 3 days after the departure date
//   for (let i = -3; i <= 3; i++) {
//     const potentialDate = departureDate.add(i, "day");

//     if (potentialDate.isBefore(today)) {
//       // If the date is before today, shift it to be after the departure date
//       const adjustedDate = departureDate.add(7 - Math.abs(i), "day");
//       dates.push({ date: adjustedDate.format("YYYY-MM-DD"), price: null });
//     } else {
//       dates.push({ date: potentialDate.format("YYYY-MM-DD"), price: null });
//     }
//   }

//   // Sort the dates in chronological order
//   dates.sort((a, b) => new Date(a.date) - new Date(b.date));

//   // Create an array of promises to fetch flight data for all dates
//   const flightPromises = dates.map((dateObj) => searchFlights(dateObj.date));

//   // Fetch data for all dates concurrently
//   const flightResults = await Promise.all(flightPromises);

//   // Process and display the results
//   flightResults.forEach((flights: any, index: number) => {
//     if (flights && flights.length > 0) {
//       const cheapestFlight = flights[0].total_amount;
//       const day = dayjs(dates[index].date).format("ddd D");

//       // Update the price in the `dates` array
//       dates[index].price = cheapestFlight;
//       dates[index].offers = flights;
//     }
//   });
// }

// async function handleCheapDatesDisplay() {
//   const container = document.getElementById("cheap-dates");
//   container.innerHTML = ""; // Clear any existing data
//   const dates = [];
//   await displayCheapDate(dates);

//   const cheapestFlight =
//     dates.length > 0
//       ? dates.reduce((cheapest, current) => {
//           if (current.price == null) return cheapest; // Skip entries without a price
//           return current.price < cheapest.price ? current : cheapest;
//         }, dates[0])
//       : null;

//   dates.forEach((item, index) => {
//     // Create the HTML structure
//     const flightDiv = document.createElement("div");
//     const dateHeading = document.createElement("h5");
//     const priceParagraph = document.createElement("span");

//     if (travelDate?.value === dates[index].date) {
//       selectedDiv = flightDiv;
//       flightDiv.className = "selected-div";
//       displayResults(dates[index].offers);
//     }
//     if (cheapestFlight.date === item.date) {
//       priceParagraph.style.color = "green";
//     }

//     dateHeading.textContent = dayjs(item.date).format("ddd D");
//     priceParagraph.textContent = `$ ${item.price}`;

//     flightDiv.appendChild(dateHeading);
//     flightDiv.appendChild(priceParagraph);
//     container.appendChild(flightDiv);

//     flightDiv.onclick = async function (e) {
//       // Reset previously selected div color to white
//       if (selectedDiv) {
//         selectedDiv.className = "";
//       }

//       // Set the clicked div color to blue
//       flightDiv.className = "selected-div";

//       // Update the selectedDiv reference
//       selectedDiv = flightDiv;

//       travelDate.value = dates[index].date;
//       displayResults(dates[index].offers);
//     };
//   });
// }
export { tabs, getTimeOfDay, filterFlights, convertDuration };
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
