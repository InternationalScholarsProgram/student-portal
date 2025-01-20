import Guides from "../components/Guides";
import Loader from "../../../components/loaders/Loader";
import BookMeeting from "../components/BookMeeting";
import Meeting from "../components/Meeting";
import useAdmissions from "../components/api/useAdmissions";
import NoOpenIntakes from "../components/NoOpenIntakes";
import EligibilityStatusCheck from "../components/EligibilityStatusCheck";
import { formatDate } from "../../../utils/utils";
import { Link } from "react-router-dom";
import { RequirementsAccordion } from "./compenents/Requirements";

function SchoolAdmission() {
  const { eligibility, status, isLoading, currentIntake } = useAdmissions();

  if (!eligibility || isLoading) return <main children={<Loader />} />;

  if (eligibility?.code !== 200)
    return <EligibilityStatusCheck eligibility={eligibility} />;

  if (status?.code === 1) return <NoOpenIntakes />;

  if (status?.code === 2) return <BookMeeting status={0} />;
  if (status?.code === 3) return <main children={<Meeting status={status} />} />;
  if (status?.code === 4 || status?.code === 5)
    return (
      <main className="">
        <section className="col gap-2 w-full p-3">
          {currentIntake && (
            <div className="row items-center gap-2">
              <p>Ongoing Intake :</p>
              <span className="font-bold first-letter:uppercase">
                {currentIntake?.intake_name}
              </span>
              from {formatDate(currentIntake?.start_date, "MMMM D, YYYY")} to{" "}
              {formatDate(currentIntake?.end_date, "MMMM D, YYYY")}
            </div>
          )}
          <Guides /> <div className="h-2" />
          <BookMeeting status={1} />
          <div className="col gap-2">
            <h3 className="text-lg opacity-70 font-semibold">
              School Application Requirements
            </h3>
            <div className="p-2">
              {status?.code === 5 ? (
                <p>
                  You have been approved to make an application
                  <Link
                    to="/school-admission-application"
                    className="text-primary-light hover:border-b hover:border-primary-main px-2"
                  >
                    Go to Application Page
                  </Link>
                </p>
              ) : (
                <p className="opacity-70">
                  You are currently <strong>not eligible</strong> to submit an
                  application.
                  <br /> To become eligible, please upload all the required
                  documents listed below and wait for their approval.
                </p>
              )}
              <RequirementsAccordion />
            </div>
          </div>
        </section>
      </main>
    );
}

export default SchoolAdmission;
