import { Link } from "react-router-dom";

const Booked = ({ row }: { row: any }) => (
  <div>
    <h5>
      <span style={{ color: "green" }}>Booking Confirmed</span>
    </h5>
    <p>
      Thank you for choosing to book with us! Your request has been successfully
      approved, and your flight has been booked.
    </p>
    <p>
      Flight updates and your ticket details will be sent to you via email or
      phone.
    </p>
    <p>
      To view your ticket details, visit the airline's website
      <a href={row?.airline_link} target="_blank" rel="noopener noreferrer">
        here
      </a>
      and use your booking reference <strong>{row?.booking_reference}</strong>.
    </p>

    <div className="mt-4 border p-4 rounded shadow">
      <h5>Booking Details</h5>
      <p>
        <strong>Itinerary Link:</strong>
        <a
          href={`/login/main/ken/student-management/travel_&_logistics/uploads/itineraries/${row?.itinerary}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Itinerary
        </a>
      </p>
      <p>
        <strong>Booking Reference:</strong> {row?.booking_reference}
      </p>
      <p>
        <strong>Airline Link:</strong>
        <a href={row?.airline_link} target="_blank" rel="noopener noreferrer">
          View Airline
        </a>
      </p>
    </div>
  </div>
);
const Rejected = ({ row }: { row: any }) => (
  <div>
    <p style={{ color: "#FF0000" }}>Booking Rejected</p>
    <p>
      Unfortunately, we were unable to process your booking request at this
      time. We apologize for any inconvenience this may have caused.
    </p>
    <p>
      <strong>Reason:</strong> {row?.comments}
    </p>
    <button
      // to="/portal/flights"
      // state="Flights"
      className="border border-blue-500 text-blue-500 px-4 py-2 rounded mt-4"
      onClick={()=> row.setShow("Flights")}
    >
      Explore Other Flight Options
    </button>
  </div>
);
const Expired = () => (
  <div>
    <p>Flight Order Expired</p>
    <p>
      Unfortunately, your flight order has expired. Please try booking a new
      flight.
    </p>
    <button
      className="border border-blue-500 text-blue-500 px-4 py-2 rounded mt-4"
      onClick={() => alert("Finding another flight")}
    >
      Find Another Flight
    </button>
  </div>
);
const Pending = () => (
  <div>
    <h5>Booking Under Review</h5>
    <p>
      Thank you for choosing to book with us! Your request has been received and
      is under review. We will contact you shortly with further details.
    </p>
  </div>
);

const BookingMessages = ({ row }: any) => {
  if (row?.status === "Booked") {
    return <Booked row={row} />;
  } else if (row?.status === "Rejected") {
    return <Rejected row={row} />;
  } else if (row?.status === "Expired") {
    return <Expired />;
  } else if (row?.status === "Pending") {
    return <Pending />;
  }
  return <p>Pending</p>;
};

export default BookingMessages;
