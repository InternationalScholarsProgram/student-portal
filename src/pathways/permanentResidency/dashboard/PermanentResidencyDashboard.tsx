import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

import useFetchUser from "../../../services/hooks/useFetchUser";
import useAccountStatement from "../../../services/hooks/useAccountStatement";

import AxiosError from "../../../components/errors/AxiosError";
import { InlineLoader } from "../../../components/loaders/Loader";
import DashLoader from "../../dashboard/components/DashLoader";

import PRProgressTracker from "./components/PRProgressTracker";
import PRFinances from "./components/PRFinances";
import PRDeadlines from "./components/UpcomingDeadlines";
import EB2NIWCard from "./components/EB2NIWCard";
import DVLotteryCard from "./components/DVLotteryCard";
import PRQuickActions from "./components/PRQuickActions";
import Activities from "../../dashboard/components/Activities";

import prEndpoints, {
  PRProgressData,
  EB2NIWStatus,
  DVLotteryStatus,
  PRDeadline,
} from "./services/permanentResidencyEndpoints";

function PermanentResidencyDashboard() {
  const { user } = useFetchUser();
  const { accountStatements, isLoading: statementLoading } = useAccountStatement();

  // Data
  const {
    data: progressData,
    isLoading: progressLoading,
    error: progressError,
  } = useQuery<PRProgressData>({ queryKey: ["pr-progress"], queryFn: prEndpoints.trackProgress });

  const {
    data: eb2,
    isLoading: eb2Loading,
    error: eb2Error,
  } = useQuery<EB2NIWStatus>({ queryKey: ["pr-eb2-status"], queryFn: prEndpoints.getEB2NIWStatus });

  const {
    data: dv,
    isLoading: dvLoading,
    error: dvError,
  } = useQuery<DVLotteryStatus>({ queryKey: ["pr-dv-status"], queryFn: prEndpoints.getDVLotteryStatus });

  const {
    data: deadlines,
    isLoading: dLoading,
    error: dError,
  } = useQuery<PRDeadline[]>({ queryKey: ["pr-deadlines"], queryFn: prEndpoints.getDeadlines });

  if (progressLoading) return <DashLoader />;
  if (progressError) return <AxiosError error={progressError} />;

  return (
    <main className="col gap-5 w-full max-w-7xl mx-auto px-3 sm:px-4">
      {/* Header (same sizing as Academic/Vocational) */}
      <div className="col flex-1 justify-between p-4 my-2 card">
        <p className="pb-1">{dayjs().format("dddd, MMMM D, YYYY")}</p>
        <div className="col gap-1 min-w-0">
          <p className="title text-primary-main">PermanentDashboard</p>
          <p className="text-sm opacity-80">
            Welcome back, {user?.fullnames}! Track your PR progress, key dates, and next steps.
          </p>
        </div>
      </div>

      {/* Row 1: EB-2 NIW + DV-Lottery – no extra card wrappers to avoid overflow */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 auto-rows-auto">
        <div className="min-w-0">
          {eb2Loading ? <InlineLoader /> : eb2Error ? <AxiosError error={eb2Error} /> : <EB2NIWCard data={eb2} />}
        </div>
        <div className="min-w-0">
          {dvLoading ? <InlineLoader /> : dvError ? <AxiosError error={dvError} /> : <DVLotteryCard data={dv} />}
        </div>
      </section>

      {/* Row 2: Quick Actions + Upcoming Deadlines (mirrors Next-Action lane) */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr,1.6fr] gap-4">
        <div className="card p-4 min-w-0">
          <PRQuickActions />
        </div>
        <div className="card p-4 min-w-0">
          {dLoading ? <InlineLoader /> : dError ? <AxiosError error={dError} /> : <PRDeadlines items={deadlines ?? []} />}
        </div>
      </section>

      {/* Row 3: Progress – your PR donuts */}
      <section className="min-w-0">
        <PRProgressTracker progressData={progressData as any} />
      </section>

      {/* Row 4: Finances – full width to avoid cramping */}
      <section className="min-w-0">
        {statementLoading ? (
          <div className="card p-4">
            <InlineLoader />
          </div>
        ) : (
          <PRFinances accountStatements={accountStatements} />
        )}
      </section>

      {/* Row 5: Activities (optional, matches academic layout) */}
      <section className="card p-4 min-w-0">
        <Activities />
      </section>
    </main>
  );
}

export default PermanentResidencyDashboard;
