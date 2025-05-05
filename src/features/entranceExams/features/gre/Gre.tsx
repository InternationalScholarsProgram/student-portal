import AxiosError from "../../../../components/errors/AxiosError";
import { InlineLoader } from "../../../../components/loaders/Loader";
import BookExam from "../../components/BookExam";
import EnrollmentStatus from "../../components/EnrollmentStatus";
import useGRE from "./services/useGRE";

function Gre() {
  const { status, invalidate, testType, isLoading, error } = useGRE();

  if (isLoading) return <InlineLoader />;
  if (error) return <AxiosError error={error} />;
  return (
    <div>
      <EnrollmentStatus
        type={testType}
        status={status?.status}
        invalidate={invalidate}
      />
      {/* <BookExam enrollment_id="ds" invalidate={invalidate} /> */}
    </div>
  );
}

export default Gre;
