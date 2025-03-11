import { tabs } from "./utils";
import Accordion from "../../../../components/Accordion";

const FlightBookingGuide = ({ openTab }: any) => {
  const viewExplore = () => openTab(tabs[1]);

  return (
    <Accordion title="Flight Booking Guide" expanded={true}>
      <p className="mb-4">
        Please read the instructions below to successfully navigate through this
        module.
      </p>
      <div className="">
        {/* Step 1 */}
        <h2 className="text-xl font-semibold mb-3">
          1: Input Your Travel Details
        </h2>
        <ul className="list-disc px-2 list-inside mb-4 space-y-2">
          <li>
            <strong>Enter Your School:</strong> Input the name of your school.
            The system will suggest the closest airport.
          </li>
          <li>
            <strong>Set Your Departure Details:</strong> Select your departure
            location and enter your preferred travel dates.
          </li>
        </ul>

        {/* Step 2 */}
        <h2 className="text-xl font-semibold mb-3">2: Search for Flights</h2>
        <ul className="list-disc px-2 list-inside mb-4 space-y-2">
          <li>
            <strong>Click "Search":</strong> The system will display a list of
            available flights.
          </li>
          <li>
            <strong>Select Your Flight:</strong> Choose your preferred flight
            from the results.
          </li>
        </ul>

        {/* Step 3 */}
        <h2 className="text-xl font-semibold mb-3">
          3: Upload a valid Visa and Contact Details
        </h2>
        <ul className="list-disc px-2 list-inside mb-4 space-y-2">
          <li>
            <strong>Upload Visa:</strong> Provide a scanned copy of your valid
            visa.
          </li>
          <li>
            <strong>Enter Contact Information:</strong> Input your phone number
            for communication.
          </li>
        </ul>

        {/* Step 4 */}
        <h2 className="text-xl font-semibold mb-3">4: Request Booking</h2>
        <ul className="list-disc px-2 list-inside mb-4 space-y-2">
          <li>
            <strong>Click "Request Booking":</strong> Submit your flight booking
            request to the admin.
          </li>
        </ul>

        {/* Step 5 */}
        <h2 className="text-xl font-semibold mb-3">5: Booking Approval</h2>
        <p className="mb-4">
          The admin will validate your visa and check your account balance.
          Based on the validation, the admin can either:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <strong>Approve:</strong> Your booking will be confirmed, and the
            details will be updated in the system.
          </li>
          <li>
            <strong>Reject:</strong> You will be notified of the reason, and no
            booking will be made.
          </li>
        </ul>
        <p className="mb-4">
          You will be notified once your flight itinerary is ready.
        </p>

        {/* Step 6 */}
        <h2 className="text-xl font-semibold mb-3">6: View Booking Details</h2>
        <p className="mb-4">
          Log in to your account to view your flight itinerary, booking
          reference, and airline details for check-in and flight updates.
        </p>

        {/* Step 7 */}
        <h2 className="text-xl font-semibold mb-3">7: Stay Updated</h2>
        <p className="mb-4">
          Flight updates will be communicated via email or phone, depending on
          the airline. Use the airline’s system to manage your booking.
        </p>

        {/* Important Notes */}
        <div className="bg-paper border-l-4 border-yellow-500 p-4 mt-6">
          <strong>Important Notes:</strong>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Ensure your visa is valid and legible before uploading.</li>
            <li>
              Double-check travel dates and contact details to avoid delays.
            </li>
            <li>Contact admin support if you encounter any issues.</li>
          </ul>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={viewExplore}
        className="primary-btn w-fit self-end px-7 mt-4"
      >
        Find Flight
      </button>
    </Accordion>
  );
};

export default FlightBookingGuide;
