import CopyToClipBoard from "../../../../components/CopyToClipBoard";
import { tabs } from "./utils";

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

    <div className="mt-4 borders-30 w-2/3 p-4 rounded shadow">
      <h5 className="font-semibold opacity-70">Booking Details</h5>
      <div className="p-2">
        <p>
          <strong>Itinerary Link:</strong>
          <a
            className="text-primary-light px-2"
            href={`/login/main/ken/student-management/travel_&_logistics/uploads/itineraries/${row?.itinerary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Itinerary
          </a>
        </p>
        <p>
          <strong>Booking Reference:</strong> {row?.booking_reference}{" "}
          <CopyToClipBoard text={row?.booking_reference} />
        </p>
        <p>
          <strong>Airline Link:</strong>
          <a
            className="text-primary-light px-2"
            href={row?.airline_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        </p>
      </div>
    </div>
    <div className="row justify-end gap-3 my-1">
      <button onClick={() => row.setOpen(false)} className="text-btn">
        Close
      </button>
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
    <div className="row justify-end gap-3 my-1">
      <button onClick={() => row.setOpen(false)} className="text-btn">
        Close
      </button>
      <button
        className=" primary-border-btn"
        onClick={() => row.setShow(tabs[1])}
      >
        Explore Other Flight Options
      </button>
    </div>
  </div>
);
const Expired = ({ row }: { row: any }) => (
  <div>
    <p>Flight Order Expired</p>
    <p>
      Unfortunately, your flight order has expired. Please try booking a new
      flight.
    </p>
    <div className="row justify-end gap-3 my-1">
      <button onClick={() => row.setOpen(false)} className="text-btn">
        Close
      </button>
      <button
        className=" primary-border-btn"
        onClick={() => row.setShow(tabs[1])}
      >
        Explore Other Flight Options
      </button>
    </div>
  </div>
);
const Pending = ({ row }: { row: any }) => (
  <div>
    <strong>Booking Under Review</strong>
    <p>
      Thank you for choosing to book with us! Your request has been received and
      is under review. We will contact you shortly with further details.
    </p>
    <div className="row justify-end gap-3 my-1">
      <button onClick={() => row.setOpen(false)} className="text-btn">
        Close
      </button>
    </div>
  </div>
);

const BookingMessages = ({ row }: any) => {
  if (row?.status === "Booked") {
    return <Booked row={row} />;
  } else if (row?.status === "Rejected") {
    return <Rejected row={row} />;
  } else if (row?.status === "Expired") {
    return <Expired row={row}/>;
  } else if (row?.status === "Pending") {
    return <Pending row={row}/>;
  }
  return <p>Pending</p>;
};

export default BookingMessages;
