import React, { useState } from "react";
import OpenTickets from "../components/OpenTickets";
import ClosedTickets from "../components/ClosedTickets";

function ViewTickets() {
  const [showOpen, setShowOpen] = useState(true);
  return (
    <div>
      <ul className="ul-links w-full">
        <button
          className={showOpen ? "selected" : ""}
          onClick={() => setShowOpen(!showOpen)}
        >
          Open Tickets
        </button>
        <button
          className={!showOpen ? "selected" : ""}
          onClick={() => setShowOpen(!showOpen)}
        >
          Closed Tickets
        </button>
      </ul>
      {showOpen ? <OpenTickets /> : <ClosedTickets />}
    </div>
  );
}

export default ViewTickets;
