import { useMutation } from "@tanstack/react-query";
import InputField from "../../../../../components/InputField";
import Modal from "../../../../../components/Modal";
import useFlightHook from "../../services/useFlightHook";
import flightApi from "../../services/flightApi";
import { useState } from "react";
import { getTimeOfDay } from "../../components/utils";
import dayjs from "dayjs";
import { formatCurrency } from "../../../../../utils/utils";

function BookFlightModal({ open, setOpen, offer }: any) {
  const { user, accountStatements } = useFlightHook();
  const [visa, setVisa] = useState<File>();
  const [number, setNumber] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const flightDate = dayjs(offer?.slices[0].segments[0].departing_at).format(
      "YYYY-MM-DD"
    );
    const timeOfDay = getTimeOfDay(flightDate);
    const payload = {
      student_id: user?.email,
      visa: visa,
      contact: number,
      order_id: offer?.id,
      offer_id: offer?.id,
      departure_airport: offer?.slices[0].origin.iata_code,
      destination_airport: offer?.slices[0].destination.iata_code,
      departure_time: `${flightDate}TANYT`,
      fare_hold_expirely:
        offer?.payment_requirements.price_guarantee_expires_at,
      flight_hold_expirely: offer?.payment_requirements.payment_required_by,
      ticket_fare: offer?.total_amount,
      airline: offer?.owner.iata_code,
      time_of_day: timeOfDay,
    };
    console.log(payload, user?.package.toLowerCase());
    await bookFlight.mutateAsync(payload);
  };
  const bookFlight = useMutation({
    mutationFn: flightApi.bookFlight,
    onSuccess: () => setOpen(false),
  });

  const bal = accountStatements?.balance - offer?.total_amount;
  return (
    <Modal open={open} setOpen={setOpen} title="Book Flight">
      <div className="w-[80vw] sm:w-[60vw] lg:w-[50vw] xl:w-[30vw] p-3">
        {bal > 0 || user?.package.toLowerCase() === "regular" ? (
          <form onSubmit={handleSubmit} className="col px-4 gap-3">
            <div className="col gap-2">
              <label className="">Phone Number</label>
              <InputField
                onChange={(e) => setNumber(e.target.value)}
                size="small"
              />
            </div>
            <div className="col gap-2">
              <label className="">Upload a valid Visa</label>
              <InputField
                type="file"
                size="small"
                onChange={(e: any) => setVisa(e.target.files[0])}
              />
            </div>
            <div className=" w-full row justify-end gap-3 m-2 p-3">
              <button
                onClick={() => setOpen(false)}
                className="text-btn py-1 px-2 cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                className="primary-btn py-1 px-2 cursor-pointer"
              >
                {bookFlight.isPending ? "Requesting..." : "Request Booking"}
              </button>
            </div>
          </form>
        ) : (
          <p>
            Account Balance insufficient. Please Top up{" "}
            {formatCurrency(bal.toFixed(2))}
          </p>
        )}
      </div>
    </Modal>
  );
}

export default BookFlightModal;
