import useAdmissions from "../../services/useAdmissions";
import CareerAdvisory from "../../../../components/career-advisory/CareerAdvisory";
import MakeApplication from "./components/MakeApplication";
import SchoolApplicationStatus from "./components/SchoolApplicationStatus";
import Loader, { InlineLoader } from "../../../../components/loaders/Loader";
import { Navigate } from "react-router";
import ContentComponent from "../../../../components/ContentComponent";
import { Link } from "react-router-dom";

function SchoolApplication() {
  const { status, proposedSchools, appliedSchools, isLoading } =
    useAdmissions();

  if (isLoading) return <InlineLoader />;
  
  if (status?.code !== 5 || !proposedSchools)
    return (
      <ContentComponent header="Application Status">
        <p>
          To make an application, please make sure you’ve completed all the
          required steps first. Once you're done, you'll be able to submit your
          application request and track your progress seamlessly.
        </p>
        <p>
          Click the button below to review and complete your admission
          requirements first
        </p>
        <Link
          to="/school-admission/requirements"
          className="primary-btn self-end"
        >
          Go to Requirements Page
        </Link>
      </ContentComponent>
    );

  return (
    <main>
      <MakeApplication />
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
