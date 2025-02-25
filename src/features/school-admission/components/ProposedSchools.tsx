import CareerAdvisory from "../../../components/career-advisory/CareerAdvisory";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import useAdmissions from "../services/useAdmissions";

function ProposedSchools() {
  const { proposedSchools, canMakeSchoolApplication } = useAdmissions();
  return (
    <div className="col gap-2">
      <h3 className="title-sm row items-center gap-1">
        <SchoolIcon /> Proposed schools
      </h3>
      <section className="card col p-3 gap-3">
        {proposedSchools?.map((item) => (
          <li key={JSON.stringify(item)} className="flex-1">
            {item?.school_name} - {item?.program_name}
          </li>
        ))}
        <p className="">
          Do you wish to apply to a different school or course ? Kindly submit
          another career advisory request.
        </p>
        <div className="self-end row my-2 gap-2">
          <CareerAdvisory
            classes={
              canMakeSchoolApplication ? "text-btn" : "primary-border-btn"
            }
            text="Career Advisory"
          />
          {canMakeSchoolApplication && (
            <Link
              to="/school-admission-application"
              className="primary-border-btn"
            >
              Request Application
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProposedSchools;
