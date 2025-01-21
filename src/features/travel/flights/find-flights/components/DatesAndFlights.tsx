import { useEffect, useState } from "react";
import dayjs from "dayjs";
import FlightItem from "./FlightItem";
import BookFlightModal from "./BookFlightModal";

interface DatesAndFlightsProps {
  flightsData: any;
}

const DatesAndFlights = ({ flightsData }: DatesAndFlightsProps) => {
  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = (offer: any) => {
    setOpen(!open);
    setSelectedOffer(offer);
  };

  useEffect(() => {
    if (flightsData?.travelDate) setSelectedDate(flightsData?.travelDate);
  }, [flightsData?.travelDate]);

  if (!flightsData) return;
  return (
    <>
      <p className="my-5">
        {selectedDate?.offers?.length} flights Available on{" "}
        {dayjs(selectedDate?.date).format("dddd,d MMM YYYY ")}
      </p>
      <div className="col gap-3 mx-[2%] sm:mx-[5%]">
        <div className="row-center mx-3 gap-2 w-full overflow-x-auto">
          {flightsData?.dates?.map((item: any) => (
            <button
              key={item?.date}
              className={`${
                item.date === selectedDate?.date && "text-primary-light"
              } p-2 borders-30 rounded-md text-center text-nowrap`}
              onClick={() => setSelectedDate(item)}
            >
              <h5 className="font-bold">{dayjs(item.date).format("ddd D")}</h5>
              <span
                className={
                  item.date === flightsData?.cheapestDate?.date
                    ? "text-secondary-main"
                    : ""
                }
              >
                $ {item.price || "N/A"}
              </span>
            </button>
          ))}
        </div>
        {selectedDate?.offers?.map((offer: any) => (
          <FlightItem key={offer.id} offer={offer} openModal={openModal} />
        ))}
      </div>
      <BookFlightModal
        open={open}
        setOpen={setOpen}
        offer={selectedOffer}
      />
    </>
  );
};

export default DatesAndFlights;
