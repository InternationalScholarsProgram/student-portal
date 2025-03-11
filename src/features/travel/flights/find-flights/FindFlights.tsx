import React, { useEffect, useState } from "react";
import Loader from "../../../../components/loaders/Loader";
import SchoolAutocomplete from "./components/SchoolAutocomplete";
import AirportsAutocomplete from "./components/AirportsAutocomplete";
import flightApi from "../services/flightApi";
import { useMutation } from "@tanstack/react-query";
import DatesAndFlights from "./components/DatesAndFlights";
import { DatePicker } from "@mui/x-date-pickers";
import { fetchCheapDates } from "../components/utils";

function FindFlights() {
  const [formData, setFormData] = useState<any>({});
  const setData = (key: string, value: any) =>
    setFormData({ ...formData, [key]: value });

  const setDestination = async () => {
    const keyword = formData?.destination?.airport;
    if (typeof keyword !== "string") return;
    console.log(keyword, "Keyword");

    const res = await flightApi.fetchAirports(keyword);
    console.log(res[0], "response");
    setData("destination", res[0]);
  };

  useEffect(() => {
    setDestination();
  }, [formData?.destination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchForFlights.mutateAsync();
  };
  const searchForFlights = useMutation({
    mutationFn: async () => await fetchCheapDates(formData),
  });

  return (
    <div>
      {/* <h3 className="text-center text-2xl font-semibold">Search Flights</h3> */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <SchoolAutocomplete
          suggestedAirport={(airport: any) => setData("destination", airport)}
        />
        <div className="search-flight-container card p-2 rounded-lg">
          <div className="col">
            <label>From</label>
            <AirportsAutocomplete
              required
              completedValue={formData?.departure}
              selectedValue={(value: any) => setData("departure", value)}
              placeholder="Departure..."
            />
          </div>
          <div className="col">
            <label>To</label>
            <AirportsAutocomplete
              required
              completedValue={formData?.destination}
              selectedValue={(value: any) => setData("destination", value)}
              placeholder="Destination..."
            />
          </div>
          <div className="col">
            <label>Travel Dates</label>
            <DatePicker
              onChange={(e) => {
                console.log(e);
                setData("travelDate", e);
              }}
              slotProps={{ textField: { size: "small", required: true } }}
            />
          </div>
          <div className="sm:col-span-3 flex flex-col-reverse">
            <div className="row justify-end h-fit">
              <button type="submit" className="primary-btn">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
      <section className="mt-8">
        {searchForFlights.isPending ? (
          <div className="w-full h-[20vh]">
            <Loader />
          </div>
        ) : (
          <DatesAndFlights flightsData={searchForFlights.data} />
        )}
      </section>
    </div>
  );
}

export default FindFlights;
