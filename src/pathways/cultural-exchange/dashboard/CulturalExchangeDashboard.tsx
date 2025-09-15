import dayjs from "dayjs";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import useFetchUser from "../../../services/hooks/useFetchUser";
import useAccountStatement from "../../../services/hooks/useAccountStatement";

import { InlineLoader } from "../../../components/loaders/Loader";
import AxiosError from "../../../components/errors/AxiosError";
import DashLoader from "../../dashboard/components/DashLoader";
import ProgressTracker from "../../dashboard/components/ProgressTracker";
import Finances from "../../dashboard/components/Finances";
import Activities from "../../dashboard/components/Activities";

import { getCulturalSnapshot, type CulturalSnapshot } from "./services/culturalDashboardEndpoints";
import CEKPI from "./components/CEKPI";
import CEChecklist from "./components/CEChecklist";
import CEInfoResources from "./components/CEInfoResources";
import CENextActionCard from "./components/CENextActionCard";

function CulturalExchangeDashboard() {
  const { user } = useFetchUser();
  const { accountStatements, isLoading: statementLoading } = useAccountStatement();

  const { data, isLoading, error } = useQuery<CulturalSnapshot>({
    queryKey: ["culturalSnapshot"],
    queryFn: getCulturalSnapshot,
    staleTime: 60_000,
  });

  // Feed the exact shape your shared <ProgressTracker /> expects
  const progressData = useMemo(() => {
    return {
      entrance_exam_required: false,              // parity with Academic/Vocational
      entrance_exam: 0,                           // CE has no exam
      school_application: data?.hostPlacement.progress ?? 0, // mapped to "application"
      funding: data?.programDocs.progress ?? 0,             // mapped to docs/fees
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
          <p className="text-sm opacity-80">Cultural Exchange overview tailored to your stage.</p>
        </div>
      </div>

      {/* KPIs + Next Action (same layout as Academic) */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-w-0">
          <CEKPI title="Host Placement" value={data?.hostPlacement.stageLabel ?? "—"} to="/pathways/cultural-exchange/host-placement" />
          <CEKPI title="Program Docs" value={data?.programDocs.stageLabel ?? "—"} to="/pathways/cultural-exchange/program-docs" />
          <CEKPI title="Visa" value={data?.visa.stageLabel ?? "—"} to="/pathways/visa" />
          <CEKPI title="Travel" value={data?.travel.stageLabel ?? "—"} to="/travel-logistics" />
        </div>

        <CENextActionCard
          label={data?.nextAction?.label ?? "You're all set for now 🎉"}
          ctaLabel={data?.nextAction?.cta ?? "Open"}
          to={data?.nextAction?.link ?? "/dashboard"}
          helper={data?.nextAction?.helper}
        />
      </section>

      {/* Progress */}
      <ProgressTracker progressData={progressData as any} />

      {/* Finances (full width) */}
      <section className="card p-4">
        {statementLoading ? (
          <InlineLoader />
        ) : (
          <Finances accountStatements={accountStatements} isLoading={statementLoading} />
        )}
      </section>

      {/* Docs + Resources */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <CEChecklist items={data?.requiredDocs ?? []} />
        <CEInfoResources resources={data?.resources ?? []} />
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

export default CulturalExchangeDashboard;
