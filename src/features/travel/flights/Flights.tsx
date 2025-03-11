import {  useState } from "react";
import FlightBookingGuide from "./components/FlightBookingGuide";
import FindFlights from "./find-flights/FindFlights";
import History from "./components/History";
import { tabs } from "./components/utils";
import "./styles/flights.css";

function Flights() {
  const [show, setShow] = useState(tabs[0]);
  return (
    <main>
      <ul className="ul-links">
        {tabs.map((tab) => (
          <button
            className={tab === show ? "selected" : ""}
            key={tab}
            onClick={() => setShow(tab)}
          >
            {tab}
          </button>
        ))}
      </ul>
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
