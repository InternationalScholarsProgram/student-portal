import useAdmissions from "../../services/useAdmissions";
import CareerAdvisory from "../../../../components/career-advisory/CareerAdvisory";
import MakeApplication from "./components/MakeApplication";
import SchoolApplicationStatus from "./components/SchoolApplicationStatus";
import Loader from "../../../../components/loaders/Loader";
import { Navigate } from "react-router";

function SchoolApplication() {
  const {
    status,
    proposedSchools,
    appliedSchools,
    notAppliedSchools,
    hasAppliedToAllSchools,
    isLoading,
  } = useAdmissions();

  if (isLoading) return <Loader />;
  if (status?.code !== 5 || !proposedSchools)
    return <Navigate to="/school-admission-requirements" />;

  return (
    <main>
      <MakeApplication
        notAppliedSchools={notAppliedSchools}
        hasAppliedAllSchools={hasAppliedToAllSchools}
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
          <CareerAdvisory
            classes="px-2 text-sm text-primary-light underline"
            text="Request Career Advisory"
          />
        </p>
      </section>
    </main>
  );
}

export default SchoolApplication;
