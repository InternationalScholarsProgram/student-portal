import { lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import PageLayout from "../styles/layouts/PageLayout";
import Visa from "../features/visa/Visa";
import Test from "./Test";
import Tuition from "../features/funding/pages/tuition/Tuition";
import Relocation from "../features/funding/pages/relocation/Relocation";
import Alternative from "../features/funding/pages/alternative/Alternative";
import Personal from "../features/funding/pages/personal/Personal";
import ErrorBoundary from "./ErrorBoundary";
import Suspense from "./Suspense";
import Disabled from "./Disabled";
import ErrorElement from "./ErrorElement";
import EntranceExams from "../features/entranceExams/EntranceExams";
import EntranceExamLayout from "../features/entranceExams/EntranceExamLayout";

// Layouts
const PortalLayout = lazy(() => import("../styles/layouts/PortalLayout"));

const TicketsLayout = lazy(() => import("../features/tickets/TicketsLayout"));
const AdmisionLayout = lazy(
  () => import("../features/school-admission/AdmisionLayout")
);

// Components
const ErrorPage = lazy(() => import("../components/errors/ErrorPage"));
const Dashboard = lazy(() => import("../features/Dashboard"));
const Profile = lazy(() => import("../features/user/Profile"));
const WebMail = lazy(() => import("../features/WebMail"));
const Resources = lazy(() => import("../features/info-resources/Resources"));
const Funding = lazy(() => import("../features/funding/Layout"));
const Flights = lazy(() => import("../features/travel/flights/Flights"));
const Requirements = lazy(
  () => import("../features/school-admission/pages/requirements/Requirements")
);
const MakePayments = lazy(() => import("../features/finances/MakePayments"));
const AccountStatements = lazy(
  () => import("../features/finances/AccountStatements")
);
const SectionResource = lazy(
  () => import("../features/entranceExams/components/SectionResource")
);
const SwitchPrograms = lazy(
  () => import("../features/program/switch/SwitchPrograms")
);
const Withdraw = lazy(() => import("../features/program/withdraw/Withdraw"));
const CreateTicket = lazy(
  () => import("../features/tickets/pages/CreateTicket")
);
const ViewTickets = lazy(
  () => import("../features/tickets/pages/view-tickets/ViewTickets")
);
const SchoolApplication = lazy(
  () =>
    import(
      "../features/school-admission/pages/school-application/SchoolApplication"
    )
);
const OnboardingAgreement = lazy(
  () => import("../features/user/contracts/OnboardingAgreement")
);
const ExpediteLetter = lazy(
  () => import("../features/visa/features/expedite/ExpediteLetter")
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
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="webmail" element={<WebMail />} />
              <Route path="resources" element={<Resources />} />

              <Route element={<Funding />}>
                <Route path="tuition" element={<Tuition />} />
                <Route path="relocation" element={<Relocation />} />
                <Route path="alternative" element={<Alternative />} />
                <Route path="personal" element={<Personal />} />
              </Route>

              <Route path="flights" element={<Flights />} />
              <Route path="test" element={<Test />} />
              <Route path="visa-processing" element={<Visa />} />

              <Route element={<Outlet />}>
                <Route path="make-payments">
                  <Route index element={<MakePayments />} />
                  <Route path=":reason" element={<MakePayments />} />
                </Route>
                <Route
                  path="account-statements"
                  element={<AccountStatements />}
                />
              </Route>

              <Route element={<EntranceExamLayout />}>
                <Route index path="gmat" element={<EntranceExams />} />
                <Route path="gre" element={<EntranceExams />} />
                <Route path="duolingo" element={<EntranceExams />} />
                <Route path=":exam/section-resource" element={<SectionResource />} />
              </Route>

              <Route element={<Outlet />}>
                <Route
                  path="switch-program-package"
                  element={<SwitchPrograms />}
                />
                <Route path="withdraw" element={<Withdraw />} />
              </Route>

              <Route element={<TicketsLayout />}>
                <Route path="create-ticket" element={<CreateTicket />} />
                <Route path="view-tickets" element={<ViewTickets />} />
              </Route>

              <Route path="school-admission" element={<AdmisionLayout />}>
                <Route index path="requirements" element={<Requirements />} />
                <Route path="application" element={<SchoolApplication />} />
              </Route>

              <Route
                path="*"
                element={
                  <div
                    className="h-[50vh] col-center"
                    children={
                      <ErrorElement error={{ message: "Page not found" }} />
                    }
                  />
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
