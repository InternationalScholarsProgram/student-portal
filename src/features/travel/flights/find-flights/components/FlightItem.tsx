import dayjs from "dayjs";
import { convertDuration } from "../../components/utils";
import FlightIcon from "@mui/icons-material/Flight";
import { formatCurrency } from "../../../../../utils/utils";
type Props = {
  offer: any;
  openModal: (offer: any) => void;
};

function FlightItem({ offer, openModal }: Props) {
  const offerSlice = offer?.slices[0];
  const noOfFlights = offerSlice?.segments?.length || 0;
  const firstSegment = offerSlice.segments[0];
  const lastSegment = offerSlice.segments.at(-1);
  const departureTime = `${dayjs(firstSegment.departing_at).format(
    "HH:mm"
  )} hrs`;
  const arrivalTime = `${dayjs(lastSegment.arriving_at).format("HH:mm")} hrs`;
  const duration = convertDuration(offerSlice.duration);

  const handleSelect = () => openModal(offer);

  return (
    <div className="card col my-4 p-1 dark:border-30">
      <div className="row border-b-30 shadow-sm p-2 gap-2">
        <img
          alt={offer?.owner?.name}
          className="max-h-[30px] bg-paper rounded-full"
          src={offer?.owner?.logo_symbol_url}
        />
        <p className="">{offer?.owner?.name}</p>
      </div>

      <div className="row flex-1">
        <div className="row justify-around items-center flex-1 mx-[5%]">
          <div className="col items-center">
            <h3>{departureTime}</h3>
            <span>{firstSegment?.origin?.iata_code}</span>
          </div>

          <div className="flex-1 mx-2 p-2">
            <div className="row-center pt-4 gap-3 m-2 ">
              <div className="w-4/5 h-[1px] bg-primary-main" />
              <FlightIcon />
              <div className="w-4/5 h-[1px] bg-primary-main" />
            </div>

            <div className="col-center w-full text-sm">
              <span>{duration} </span>
              <span>
                {noOfFlights === 1 ? "Direct" : noOfFlights + " stops"}
              </span>
            </div>
          </div>

          <div className="col items-center">
            <h3>{arrivalTime}</h3>
            <span>{lastSegment?.destination?.iata_code}</span>
          </div>
        </div>

        <div className="col-center gap-2 w-fit p-3">
          <p className="font-bold text-lg">
            {formatCurrency(offer?.total_amount)}
          </p>
          <button onClick={handleSelect} className="primary-border-btn p-4">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightItem;
