import { lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import PageLayout from "../styles/layouts/PageLayout";
import Visa from "../pathways/visa/Visa";
import Tuition from "../pathways/academic/funding/pages/tuition/Tuition";
import Relocation from "../pathways/academic/funding/pages/relocation/Relocation";
import Alternative from "../pathways/academic/funding/pages/alternative/Alternative";
import Personal from "../pathways/academic/funding/pages/personal/Personal";
import ErrorBoundary from "./ErrorBoundary";
import Suspense from "./Suspense";
import Disabled from "./Disabled";
import ErrorElement from "./ErrorElement";
import EntranceExams from "../pathways/academic/entranceExams/EntranceExams";
import EntranceExamLayout from "../pathways/academic/entranceExams/EntranceExamLayout";
import ViewSchool from "../pathways/academic/school-admission/pages/requirements/ViewSchool";
import Login from "../pathways/user/Login";
import AcademicDashboard from "../pathways/academic/dashboard/AcademicDashboard";
import VocationalDashboard from "../pathways/vocational/VocationalDashboard";

// Layouts
const PortalLayout = lazy(() => import("../styles/layouts/PortalLayout"));

const TicketsLayout = lazy(() => import("../pathways/tickets/TicketsLayout"));
const AdmisionLayout = lazy(
  () => import("../pathways/academic/school-admission/AdmisionLayout")
);

// Components
const ErrorPage = lazy(() => import("../components/errors/ErrorPage"));
const Dashboard = lazy(() => import("../pathways/dashboard/Dashboard"));
const Profile = lazy(() => import("../pathways/user/Profile"));
const WebMail = lazy(() => import("../pathways/WebMail"));
const Resources = lazy(() => import("../pathways/info-resources/Resources"));
const Funding = lazy(() => import("../pathways/academic/funding/Layout"));
const Flights = lazy(() => import("../pathways/travel/flights/Flights"));
const Requirements = lazy(
  () => import("../pathways/academic/school-admission/pages/requirements/Requirements")
);
const MakePayments = lazy(() => import("../pathways/finances/MakePayments"));
const AccountStatements = lazy(
  () => import("../pathways/finances/AccountStatements")
);
const SectionResource = lazy(
  () => import("../pathways/academic/entranceExams/components/SectionResource")
);
const SwitchPrograms = lazy(
  () => import("../pathways/program/switch/SwitchPrograms")
);
const Withdraw = lazy(() => import("../pathways/program/withdraw/Withdraw"));
const CreateTicket = lazy(
  () => import("../pathways/tickets/pages/CreateTicket")
);
const ViewTickets = lazy(
  () => import("../pathways/tickets/pages/view-tickets/ViewTickets")
);
const SchoolApplication = lazy(
  () =>
    import(
      "../pathways/academic/school-admission/pages/school-application/SchoolApplication"
    )
);
const OnboardingAgreement = lazy(
  () => import("../pathways/user/contracts/OnboardingAgreement")
);
const ExpediteLetter = lazy(
  () => import("../pathways/visa/features/expedite/ExpediteLetter")
);

function Router() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <ErrorBoundary>
        <Suspense name="router">
          <Routes>
            <Route element={<PageLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="contract" element={<Outlet />}>
                <Route
                  path="onboarding-agreement"
                  element={<OnboardingAgreement />}
                />
              </Route>
              <Route
                path="/visa-processing/expedite-letter"
                element={<ExpediteLetter />}
              />
              <Route path="/disabled" element={<Disabled />} />
            </Route>
            <Route element={<PortalLayout />} errorElement={<ErrorPage />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="webmail" element={<WebMail />} />
              <Route path="resources" element={<Resources />} />

              <Route path="/pathways/academic/funding" element={<Funding />}>
                <Route path="tuition" element={<Tuition />} />
                <Route path="relocation" element={<Relocation />} />
                <Route path="alternative" element={<Alternative />} />
                <Route path="personal" element={<Personal />} />
              </Route>

              <Route path="/finances" element={<Outlet />}>
                <Route path="make-payments">
                  <Route index element={<MakePayments />} />
                  <Route path=":reason" element={<MakePayments />} />
                </Route>
                <Route
                  path="account-statements"
                  element={<AccountStatements />}
                />
              </Route>

              <Route path="/pathways/academic/entrance-exams" element={<EntranceExamLayout />}>
                <Route index path="gmat" element={<EntranceExams />} />
                <Route path="gre" element={<EntranceExams />} />
                <Route path="duolingo" element={<EntranceExams />} />
                <Route
                  path=":exam/section-resource"
                  element={<SectionResource />}
                />
              </Route>

              <Route path="/program-options" element={<Outlet />}>
                <Route path="switch" element={<SwitchPrograms />} />
                <Route path="withdraw" element={<Withdraw />} />
              </Route>

              <Route path="/tickets" element={<TicketsLayout />}>
                <Route path="create-ticket" element={<CreateTicket />} />
                <Route path="view-tickets" element={<ViewTickets />} />
              </Route>

              <Route path="/pathways/academic/school-admission" element={<AdmisionLayout />}>
                <Route index path="requirements" element={<Requirements />} />
                <Route path="application" element={<SchoolApplication />} />
                <Route
                  path="requirements/view-school"
                  element={<ViewSchool />}
                />
              </Route>
              <Route
                path="/pathways/academic/academicDashboard"
                element={<AcademicDashboard />}
              />
              <Route path="visa-processing" element={<Visa />} />

              <Route path="/travel-logistics" element={<Outlet />}>
                <Route path="flights" element={<Flights />} />
                <Route path="accommodations" element={<CommingSoon />} />
                <Route path="pick-up" element={<CommingSoon />} />
              </Route>
              <Route path="/pathways/vocational/vocationalDashboard" element={<VocationalDashboard />} />

              <Route
                path="*"
                element={
                  <div className="h-[50vh] col-center">
                    <ErrorElement error={{ message: "Page not found" }} />
                  </div>
                }
              />
            </Route>

          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default Router;
const CommingSoon = () => {
  return (
    <div className="h-[50vh] col-center">
      <ErrorElement error={{ message: "Comming soon" }} />
    </div>
  );
};
