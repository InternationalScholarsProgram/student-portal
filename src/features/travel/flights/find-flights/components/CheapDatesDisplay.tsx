import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import flightApi from "../../services/flightApi";

interface FlightOffer {
  total_amount: number;
  // Include other properties as needed based on your API response
}

interface DateObject {
  date: string;
  price: number | null;
  offers?: FlightOffer[];
}

interface CheapDatesDisplayProps {
  formData: any;
}

const CheapDatesDisplay: React.FC<CheapDatesDisplayProps> = ({ formData }) => {
  const [dates, setDates] = useState<DateObject[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [cheapestDate, setCheapestDate] = useState<DateObject | null>(null);

  useEffect(() => {
    const fetchCheapDates = async () => {
      const departureDate = dayjs(formData?.travelDate);
      const today = dayjs().startOf("day");
      const generatedDates: DateObject[] = [];

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
      generatedDates.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      // Fetch flight data for all dates
      const flightPromises = generatedDates.map((dateObj) =>
        flightApi.searchFlights(
          dateObj.date,
          formData?.departure,
          formData?.destination
        )
      );
      const flightResults = await Promise.all(flightPromises);

      // Update dates with flight data
      flightResults.forEach((flights, index) => {
        if (flights && flights.length > 0) {
          const cheapestFlight = flights[0].total_amount;
          generatedDates[index].price = cheapestFlight;
          generatedDates[index].offers = flights;
        }
      });

      // Find the cheapest flight
      const cheapest = generatedDates.reduce((cheapest, current) => {
        if (current.price == null) return cheapest;
        return current.price < (cheapest.price || Infinity)
          ? current
          : cheapest;
      }, generatedDates[0]);

      setDates(generatedDates);
      setCheapestDate(cheapest);
    };

    fetchCheapDates();
  }, [formData?.travelDate]);

  const handleDateClick = (dateObj: DateObject) => {
    setSelectedDate(dateObj.date);
  };

  return (
    <div id="cheap-dates">
      {dates.map((item) => (
        <div
          key={item.date}
          className={`${
            item.date === selectedDate ? "selected-div" : ""
          } p-4 border rounded-md mb-2 cursor-pointer`}
          onClick={() => handleDateClick(item)}
        >
          <h5 className="font-bold">{dayjs(item.date).format("ddd D")}</h5>
          <span
            className={`${
              item.date === cheapestDate?.date ? "text-green-500" : ""
            }`}
          >
            $ {item.price || "N/A"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CheapDatesDisplay;
