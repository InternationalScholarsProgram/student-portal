import CareerAdvisory from "../../../components/career-advisory/CareerAdvisory";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import useAdmissions from "./api/useAdmissions";
import SchoolIcon from "@mui/icons-material/School";
import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

function BookMeeting({ status }: { status: number }) {
  const {
    status: { code },
    proposedSchools,
  } = useAdmissions();
  return (
    <main>
      <section className="card col p-3 gap-3">
        {status === 0 ? (
          <>
            <h3 className="p-2 opacity-70 font-semibold row-center w-fit gap-1">
              <EventAvailableIcon /> Book a Career Advisory Meeting
            </h3>
            <p>
              To submit the request to setup a meeting with our career advisory
              team, you must be at the stage of applying to schools, and
              therefore you must be either a new prime option student who has
              made a full contribution or a regular option student who has
              already passed GMAT/GRE exam.
            </p>
            <p>
              Please note, once our team processes your request, you will
              receive a meeting invite in this module within the next 24hrs.
            </p>
            <div className="self-end my-2">
              <CareerAdvisory text="Request Career Advisory" />
            </div>
          </>
        ) : (
          <>
            <h3 className="p-2 opacity-70 font-semibold row-center w-fit gap-1">
              <SchoolIcon /> Proposed schools
            </h3>
            {proposedSchools?.map((item: any) => (
              <div key={JSON.stringify(item)} className="row w-full">
                <li className="flex-1">
                  {item?.school_name} - {item?.program_name}{" "}
                </li>
                {/* {code === 5 && item?.SOP_status === "2" && (
                  <Link to="/school-admission-application" state={item}>
                    <Chip
                      label={
                        item?.application_status === "applied"
                          ? "View application status"
                          : "Submit application request"
                      }
                      color={
                        item?.application_status === "applied"
                          ? "primary"
                          : "secondary"
                      }
                      variant="outlined"
                    />
                  </Link>
                )} */}
              </div>
            ))}
            <p className="">
              Do you wish to apply to a different school or course ? Kindly
              submit another career advisory request.
            </p>
            <div className="self-end row my-2 gap-2">
              <CareerAdvisory
                classes={code === 5 ? "text-btn" : "primary-border-btn"}
                text="Request Career Advisory"
              />
              {code === 5 && (
                <Link to="/school-admission-application" className="primary-border-btn">
                  Request Application
                </Link>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default BookMeeting;
