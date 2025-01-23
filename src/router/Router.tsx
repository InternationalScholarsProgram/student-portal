import { Suspense, lazy } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import LoaderSideBar from "./LoaderSideBar";
import PageLayout from "../styles/layouts/PageLayout";
import Visa from "../features/visa/Visa";

// Layouts
const PortalLayout = lazy(() => import("../styles/layouts/PortalLayout"));
const FinancesLayout = lazy(
  () => import("../features/finances/layout/FinancesLayout")
);
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
const Funding = lazy(() => import("../features/funding/Funding"));
const Flights = lazy(() => import("../features/travel/flights/Flights"));
const SchoolAdmission = lazy(
  () => import("../features/school-admission/requirements/SchoolAdmission")
);
const MakePayments = lazy(() => import("../features/finances/MakePayments"));
const AccountStatements = lazy(
  () => import("../features/finances/AccountStatements")
);
const Gmat = lazy(() => import("../features/entranceExams/gmat/Gmat"));
const Gre = lazy(() => import("../features/entranceExams/gre/Gre"));
const TrainingResources = lazy(
  () => import("../features/entranceExams/components/TrainingResources")
);
const SwitchPrograms = lazy(
  () => import("../features/program/switch/SwitchPrograms")
);
const Withdraw = lazy(() => import("../features/program/withdraw/Withdraw"));
const CreateTicket = lazy(
  () => import("../features/tickets/pages/CreateTicket")
);
const ViewTickets = lazy(() => import("../features/tickets/pages/ViewTickets"));
const SchoolApplication = lazy(
  () =>
    import("../features/school-admission/school-application/SchoolApplication")
);
const OnboardingAgreement = lazy(
  () => import("../features/user/contracts/OnboardingAgreement")
);

function Router() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
      }}
    >
      <Suspense fallback={<LoaderSideBar />} name="router">
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="contract" element={<Outlet />}>
              <Route
                path="onboarding-agreement"
                element={<OnboardingAgreement />}
              />
            </Route>
          </Route>
          <Route element={<PortalLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="webmail" element={<WebMail />} />
            <Route path="resources" element={<Resources />} />
            <Route path="funding" element={<Funding />} />
            <Route path="flights" element={<Flights />} />
            <Route path="visa-processing" element={<Visa />} />
            <Route path="school-admission" element={<SchoolAdmission />} />
            <Route element={<FinancesLayout />}>
              <Route path="make-payments">
                <Route index element={<MakePayments />} />
                <Route path=":reason" element={<MakePayments />} />
              </Route>
              <Route
                path="account-statements"
                element={<AccountStatements />}
              />
            </Route>

            <Route element={<Outlet />}>
              <Route index path="gmat" element={<Gmat />} />
              <Route path="gre" element={<Gre />} />
              <Route path="training-resource" element={<TrainingResources />} />
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

            <Route element={<AdmisionLayout />}>
              <Route
                path="school-admission-requirements"
                index
                element={<SchoolAdmission />}
              />
              <Route
                path="school-admission-application"
                element={<SchoolApplication />}
              />
            </Route>

            <Route path="*" element={<div />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
