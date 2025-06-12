import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

import useFetchUser from "../../services/hooks/useFetchUser";
import useAccountStatement from "../../services/hooks/useAccountStatement";
import dashboardEndpoints from "./services/dashboardEndpoints";
import ProgressTracker from "./components/ProgressTracker";
import Finances from "./components/Finances";
import Activities from "./components/Activities";
import { InlineLoader } from "../../components/loaders/Loader";
import AxiosError from "../../components/errors/AxiosError";
import DashLoader from "./components/DashLoader";

function Dashboard() {
  const { user } = useFetchUser();
  const { accountStatements, isLoading: statementLoading } =
    useAccountStatement();

  const {
    data: progressData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["progressData"],
    queryFn: dashboardEndpoints.trackProgress,
    select: (response) => response?.data?.data as ProgressData,
  });

  if (isLoading || statementLoading) return <DashLoader />;
  if (error) return <AxiosError error={error} />;

  return (
    <main className="col gap-5 w-full">
      <div className="col flex-1 justify-between p-4 my-2 card">
        <p className="pb-4">{dayjs().format("dddd, MMMM D, YYYY")}</p>
        <div className="col">
          <p className="title text-primary-main">
            Welcome Back {user?.fullnames}!
          </p>
          <p className="text-sm">Always stay updated in your Student portal</p>
        </div>
      </div>
      <ProgressTracker progressData={progressData} />

      {statementLoading ? (
        <InlineLoader />
      ) : (
        <>
          <Finances
            accountStatements={accountStatements}
            isLoading={statementLoading}
          />
          <Activities />
        </>
      )}
    </main>
  );
}

export default Dashboard;

export type ProgressData = {
  entrance_exam_required: boolean;
  school_application: number;
  entrance_exam: number;
  funding: number;
  visa: number;
  travel: number;
};
