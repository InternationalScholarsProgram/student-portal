import dayjs from "dayjs";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import useFetchUser from "../../services/hooks/useFetchUser";
import useAccountStatement from "../../services/hooks/useAccountStatement";

import { InlineLoader } from "../../components/loaders/Loader";
import AxiosError from "../../components/errors/AxiosError";

import DashLoader from "../dashboard/components/DashLoader";
import ProgressTracker from "../dashboard/components/ProgressTracker";
import Finances from "../dashboard/components/Finances";
import Activities from "../dashboard/components/Activities";
import { getVocationalSnapshot, type VocationalSnapshot } from "./dashboard/services/vocationalDashboardEndpoints";
import KPI from "./dashboard/components/KPI";
import NextActionCard from "./dashboard/components/NextActionCard";
import VocationalChecklist from "./dashboard/components/VocationalChecklist";
import InfoResources from "./dashboard/components/InfoResources";




function VocationalDashboard() {
  const { user } = useFetchUser();
  const { accountStatements, isLoading: statementLoading } = useAccountStatement();

  const { data, isLoading, error } = useQuery<VocationalSnapshot>({
    queryKey: ["vocationalSnapshot"],
    queryFn: getVocationalSnapshot,
    staleTime: 60_000,
  });

  const progressData = useMemo(() => {
    // Map into your existing ProgressTracker shape
    return {
      entrance_exam_required: false,
      entrance_exam: 0,
      school_application: data?.programSelection.progress ?? 0,
      funding: data?.bankStatement.progress ?? 0,
      visa: data?.visa.progress ?? 0,
      travel: data?.travel.progress ?? 0,
    };
  }, [data]);

  if (isLoading || statementLoading) return <DashLoader />;
  if (error) return <AxiosError error={error} />;

  return (
    <main className="col gap-5 w-full max-w-7xl mx-auto px-3 sm:px-4">
      {/* Header */}
      <div className="col flex-1 justify-between p-4 my-2 card">
        <p className="pb-1">{dayjs().format("dddd, MMMM D, YYYY")}</p>
        <div className="col gap-1">
          <p className="title text-primary-main">Welcome back, {user?.fullnames}!</p>
          <p className="text-sm opacity-80">
            Vocational training pathway overview tailored to your current stage.
          </p>
        </div>
      </div>

      {/* KPIs + Next Action */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPI title="Advisory" value={data?.advisory.stageLabel ?? "—"} to="/pathways/vocational/advisory-meeting" />
          <KPI title="Program" value={data?.programSelection.stageLabel ?? "—"} to="/pathways/vocational/program-selection" />
          <KPI title="Bank Statement" value={data?.bankStatement.stageLabel ?? "—"} to="/pathways/vocational/bank-statement-upload-approval" />
          <KPI title="Visa" value={data?.visa.stageLabel ?? "—"} to="/pathways/visa" />
        </div>

        <NextActionCard
          label={data?.nextAction?.label ?? "You're all set for now 🎉"}
          ctaLabel={data?.nextAction?.cta ?? "Open"}
          to={data?.nextAction?.link ?? "/dashboard"}
          helper={data?.nextAction?.helper}
        />
      </section>

      {/* Progress */}
      <ProgressTracker progressData={progressData} />

      {/* Finances (full width to avoid cramping) */}
      <section className="card p-4">
        {statementLoading ? (
          <InlineLoader />
        ) : (
          <Finances accountStatements={accountStatements} isLoading={statementLoading} />
        )}
      </section>

      {/* Checklist + Info Resources */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <VocationalChecklist items={data?.requiredDocs ?? []} />
        <InfoResources resources={data?.resources ?? []} />
      </section>

      {/* Activities */}
      <section className="card p-4">
        <Activities />
        <div className="mt-3">
          <Link to="/view-tickets" className="text-primary-main underline text-sm">
            Need help? View your tickets
          </Link>
        </div>
      </section>
    </main>
  );
}

export default VocationalDashboard;
