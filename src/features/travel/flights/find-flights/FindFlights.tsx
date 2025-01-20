import React, { useEffect, useState } from "react";
import Loader from "../../../../components/loaders/Loader";
import SchoolAutocomplete from "./components/SchoolAutocomplete";
import AirportsAutocomplete from "./components/AirportsAutocomplete";
import flightApi from "../services/flightApi";
import InputField from "../../../../components/InputField";
import FlightItem from "../components/FlightItem";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import CheapDatesDisplay from "./components/CheapDatesDisplay";

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

  const handleSuggestedAirport = (airport: any) => {
    setData("destination", airport);
    setDestination();
  };

  const searchForFlights = useMutation({
    mutationFn: async () => {
      const res = await flightApi.searchFlights(
        formData?.travelDate,
        formData?.departure,
        formData?.destination
      );
      return res;
    },
    onSuccess: (res: any) => {
      console.log(res);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    searchForFlights.mutate();
    console.log("Searching for flights...", searchForFlights.data);
  };

  return (
    <div>
      {/* <FlightBookingGuide /> */}
      <section>
        <h3 className="text-center text-2xl font-semibold mb-6">
          Search Flights
        </h3>
        <div id="explore" className="w-full ">
          <SchoolAutocomplete
            suggestedAirport={(airport: any) => handleSuggestedAirport(airport)}
          />
          <button onClick={setDestination}>Test</button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <div>
                <label>From</label>
                <AirportsAutocomplete
                  required
                  completedValue={formData?.departure}
                  selectedValue={(value: any) => setData("departure", value)}
                  placeholder="Departure..."
                />
              </div>
              <div>
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
                <InputField
                  type="date"
                  required
                  value={formData.travelDate}
                  onChange={(e) => setData("travelDate", e.target.value)}
                />
              </div>
            </div>
            {/* <div>
              <label>Travel Date</label>
              <article className="date-carousel">
                <input type="button" className="date-carousel-prev" value="&lt;" />
                <input type="date" className="date-carousel-input" required />
                <input type="button" className="date-carousel-next" value="&gt;" />
              </article>
            </div> */}

            <div className="flex justify-end">
              <button type="submit" className="primary-btn self-end">
                Search
              </button>
            </div>
          </form>

          <section className="mt-8">
            {searchForFlights.isPending ? (
              <Loader />
            ) : (
              <>
                <p>
                  {searchForFlights.data?.length} flights Available on{" "}
                  {dayjs(formData?.travelDate).format("dddd,d MMM , YYYY ")}
                </p>
                <div id="cheap-dates" className="mt-4"></div>
                {/* {searchForFlights.data?.map((flight: any) => (
                  <FlightItem offer={flight} />
                ))} */}
                <CheapDatesDisplay formData={formData} />
              </>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}

export default FindFlights;
