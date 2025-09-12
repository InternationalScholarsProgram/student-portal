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

import { getAcademicSnapshot, type AcademicSnapshot } from "./services/academicDashboardEndpoints";
import KPI from "./components/KPI";
import NextActionCard from "./components/NextActionCard";
import AcademicChecklist from "./components/AcademicChecklist";
import InfoResources from "./components/InfoResources";

function AcademicDashboard() {
  const { user } = useFetchUser();
  const { accountStatements, isLoading: statementLoading } = useAccountStatement();

  const { data, isLoading, error } = useQuery<AcademicSnapshot>({
    queryKey: ["academicSnapshot"],
    queryFn: getAcademicSnapshot,
    staleTime: 60_000,
  });

  const progressData = useMemo(() => {
    return {
      entrance_exam_required: data?.entranceExam.required ?? false,
      entrance_exam: data?.entranceExam.progress ?? 0,
      school_application: data?.schoolAdmission.progress ?? 0,
      funding: data?.funding.progress ?? 0,
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
          <p className="text-sm opacity-80">Academic pathway overview tailored to your stage.</p>
        </div>
      </div>

      {/* KPIs + Next Action */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPI title="Admission" value={data?.schoolAdmission.stageLabel ?? "—"} to="/pathways/academic/school-admission" />
          <KPI title="Funding" value={data?.funding.stageLabel ?? "—"} to="/pathways/academic/funding" />
          <KPI title="Visa" value={data?.visa.stageLabel ?? "—"} to="/pathways/visa" />
          <KPI title="Travel" value={data?.travel.stageLabel ?? "—"} to="/travel-logistics" />
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

      {/* Finances: full width to avoid cramping */}
      <section className="card p-4">
        {statementLoading ? (
          <InlineLoader />
        ) : (
          <Finances accountStatements={accountStatements} isLoading={statementLoading} />
        )}
      </section>

      {/* Docs + Resources: split on xl, stack on smaller */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AcademicChecklist items={data?.requiredDocs ?? []} />
        <InfoResources resources={data?.resources ?? []} />
      </section>

      {/* Activities: own card with scrollable content if large */}
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

export default AcademicDashboard;
