import EnrollmentStatus from "../../components/EnrollmentStatus";
import { InlineLoader } from "../../../../components/loaders/Loader";
import AxiosError from "../../../../components/errors/AxiosError";
import AccessResources from "../../components/AccessResources";
import useGetStatus from "../../services/useGetStatus";

function Duolingo() {
  const { status, invalidateStatus, error, isLoading, testType } =
    useGetStatus();

  if (isLoading) return <InlineLoader />;
  if (error) return <AxiosError error={error} />;

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
      return <AccessResources />;

    default:
      return <div>Something went wrong</div>;
  }
}
export default Duolingo;
