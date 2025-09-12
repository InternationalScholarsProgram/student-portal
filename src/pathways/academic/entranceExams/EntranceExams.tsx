
import AxiosError from "../../../components/errors/AxiosError";
import { InlineLoader } from "../../../components/loaders/Loader";
import AccessResources from "./components/AccessResources";
import EnrollmentStatus from "./components/EnrollmentStatus";
import ExamTime from "./components/ExamTime";
import useGetStatus from "./services/useGetStatus";

function EntranceExams() {
  const { status, invalidateStatus, error, isLoading, testType } =
    useGetStatus();

  if (isLoading) return <InlineLoader />;
  if (error) return <AxiosError error={error} />;
  if (!status?.status) return <div>Something went wrong</div>;

  switch (status?.status) {
    case 0:
    case 1:
    case 3:
      return (
        <EnrollmentStatus
          invalidate={invalidateStatus}
          type={testType}
          status={status?.status}
          reason={status?.admin_comment}
        />
      );
    case 4:
    case 6:
      return <AccessResources deadline={status?.deadline} />;
    case 5:
      return <ExamTime />;
  }
}

export default EntranceExams;
