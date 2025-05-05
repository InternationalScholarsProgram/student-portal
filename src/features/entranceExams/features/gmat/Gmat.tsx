import useGMAT from "./services/useGMAT";
import EnrollmentStatus from "../../components/EnrollmentStatus";
import { InlineLoader } from "../../../../components/loaders/Loader";
import AxiosError from "../../../../components/errors/AxiosError";
import AccessResources from "../../components/AccessResources";

function Gmat() {
  const { status, invalidate, error, isLoading, testType } = useGMAT();

  if (isLoading) return <InlineLoader />;
  if (error) return <AxiosError error={error} />;

  switch (status?.status) {
    case 0:
    case 1:
    case 3:
      return (
        <EnrollmentStatus
          invalidate={() => invalidate("status")}
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

export default Gmat;
