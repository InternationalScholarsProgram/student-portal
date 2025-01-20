import useAdmissions from "../components/api/useAdmissions";
import CareerAdvisory from "../../../components/career-advisory/CareerAdvisory";
import MakeApplication from "./components/MakeApplication";
import SchoolApplicationStatus from "./components/SchoolApplicationStatus";
import Loader from "../../../components/loaders/Loader";
import { Navigate } from "react-router";

function SchoolApplication() {
  const { status, proposedSchools, isLoading } = useAdmissions();

  if (isLoading) return <Loader />;
  if (status?.code !== 5 || !proposedSchools)
    return <Navigate to="/school-admission-requirements" />;

  const notAppliedSchools = proposedSchools?.filter(
    (item: any) =>
      item?.SOP_status === "2" && item?.application_status !== "applied"
  );
  const appliedSchools = proposedSchools?.filter(
    (item: any) => item?.application_status === "applied"
  );
  const hasAppliedAllSchools = proposedSchools?.every(
    (item: any) => item?.application_status === "applied"
  );

  return (
    <main>
      <MakeApplication
        notAppliedSchools={notAppliedSchools}
        hasAppliedAllSchools={hasAppliedAllSchools}
        intake_id={status?.message?.intake_id}
      />
      {appliedSchools.length > 0 && (
        <SchoolApplicationStatus appliedSchools={appliedSchools} />
      )}
      <div className="h-5"></div>
      <section className="m-4 col">
        <p className="text-sm">
          Do you wish to seek clarification or guidance on the schools you
          applied to ? Kindly submit another career advisory request.
        </p>
        <div className="self-end my-2">
          <CareerAdvisory
            classes="primary-border-btn text-sm p-1"
            text="Request Career Advisory"
          />
        </div>
      </section>
    </main>
  );
}

export default SchoolApplication;
