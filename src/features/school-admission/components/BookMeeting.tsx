import CareerAdvisory from "../../../components/career-advisory/CareerAdvisory";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckApplicationContract from "../pages/requirements/compenents/CheckApplicationContract";

function BookMeeting() {
  return (
    <main>
      <h3 className="p-2 opacity-70 font-semibold row-center w-fit gap-1">
        <EventAvailableIcon /> Book a Career Advisory Meeting
      </h3>
      <section className="card col p-3 gap-3">
        <p>
          To submit the request to setup a meeting with our career advisory
          team, you must be at the stage of applying to schools, and therefore
          you must be either a new prime option student who has made a full
          contribution or a regular option student who has already passed
          GMAT/GRE exam.
        </p>
        <p>
          Please note, once our team processes your request, you will receive a
          meeting invite in this module within the next 24hrs.
        </p>
        <div className="self-end my-2">
          <CareerAdvisory text="Request Career Advisory" />
        </div>
      </section>
      <CheckApplicationContract />
    </main>
  );
}

export default BookMeeting;
