import { useState } from "react";
import FlightBookingGuide from "./components/FlightBookingGuide";
import FindFlights from "./find-flights/FindFlights";
import History from "./components/History";
import { tabs } from "./components/utils";
import "./styles/flights.css";
import TopTab from "../../../components/TopTab";

function Flights() {
  const [show, setShow] = useState<any>(tabs[0]);
  return (
    <main>
      <TopTab tabs={tabs} activeTab={show} setActiveTab={setShow} />
      <section className="w-full p-3">
        {show === tabs[0] ? (
          <FlightBookingGuide openTab={setShow} />
        ) : show === tabs[1] ? (
          <FindFlights />
        ) : (
          <History setShow={setShow} />
        )}
      </section>
    </main>
  );
}

export default Flights;
