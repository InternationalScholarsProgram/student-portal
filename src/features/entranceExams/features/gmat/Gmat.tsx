import { useEffect, useState } from "react";
import FirstPhase from "../../components/FirstPhase";
import SecondPhase from "../../components/SecondPhase";
import useGMAT from "./services/useGMAT";
import EnrollmentStatus from "../../components/EnrollmentStatus";
import { InlineLoader } from "../../../../components/loaders/Loader";
import AxiosError from "../../../../components/errors/AxiosError";
import Resources from "../../components/Resources";
import useExamsStore from "../../services/useExamsStore";

function Gmat() {
  const { status, invalidate, error, isLoading, testType } = useGMAT();

  const { setSections, setResource, setSectionCount } = useExamsStore();

  useEffect(() => {
    if (status?.status === 2 || status?.status === 4) {
      setSections(status?.resources);
      setResource(status);
      setSectionCount(status?.section_count);
    }
  }, [status?.status]);

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
    case 2:
    case 4:
      return <Resources />;

    default:
      return <div>Something went wrong</div>;
  }
}

export default Gmat;
