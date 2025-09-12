import {
  DashboardOutlined as DashboardOutlinedIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  LibraryBooksOutlined as LibraryBooksOutlinedIcon,
  CreditCardOutlined as CreditCardOutlinedIcon,
} from "@mui/icons-material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

// keep your existing loans import as-is
import { loans } from "../pathways/academic/funding/utils";

/* ----------------------- UNCHANGED: linkItems ----------------------- */
const linkItems = [
  { icon: <DashboardOutlinedIcon />, name: "Dashboard", to: "dashboard" },
  { icon: <PersonOutlineOutlinedIcon />, name: "Profile", to: "profile", hidden: true },
  { icon: <EmailOutlinedIcon />, name: "WebMail", to: "webmail" },
  { icon: <LibraryBooksOutlinedIcon />, name: "Info Resources", to: "resources" },

  {
    icon: <PaymentsOutlinedIcon />,
    name: "Finances",
    to: "finances",
    subItems: [
      { name: "Make Payments", to: "make-payments" },
      { name: "Account Statements", to: "account-statements" },
    ],
  },
  {
    icon: <BookOutlinedIcon />,
    name: "Program Options",
    to: "program-options",
    subItems: [
      { name: "Switch Options", to: "switch" },
      { name: "Withdraw", to: "withdraw" },
    ],
  },
  {
    icon: <SupportAgentOutlinedIcon />,
    name: "Tickets",
    to: "tickets",
    subItems: [
      { name: "Create Ticket", to: "create-ticket" },
      { name: "View Tickets", to: "view-tickets" },
    ],
  },
];

/* ------------------- SHARED (outside pathways) ------------------- */
const commonItems = [
  {
    name: "Visa Processing",
    to: "visa-processing",
    icon: <CreditCardOutlinedIcon />,
  },
  {
    name: "Travel & Logistics",
    to: "travel-logistics",
    icon: <FlightTakeoffOutlinedIcon />,
    subItems: [
      { name: "Accommodations", to: "accommodations" },
      { name: "Flight", to: "flights" },
      { name: "Pick Up", to: "pick-up" },
    ],
  },
];

/* ------------------- PATHWAYS WITH NESTED MODULES ------------------- */
/* Academic stays exactly as before (unchanged). Other pathways updated per your table. */
const pathways = [
  /* ----- Academic (unchanged) ----- */
  {
    name: "Academic",
    to: "pathways/academic",
    icon: <SchoolOutlinedIcon />,
    subItems: [
      {
        name: "dashboard",
        to: "academicDashboard",
        icon: <DashboardOutlinedIcon />,
      },
      {
        name: "Entrance Exams",
        to: "entrance-exams",
        icon: <AutoStoriesOutlinedIcon />,
        subItems: [
          { name: "GMAT", to: "gmat" },
          { name: "GRE", to: "gre" },
          { name: "Duolingo", to: "duolingo" },
        ],
      },
      {
        name: "School Admission",
        to: "school-admission",
        icon: <SchoolOutlinedIcon />,
        subItems: [
          { name: "Requirements", to: "requirements" },
          { name: "Applications", to: "application" },
        ],
      },
      {
        name: "Funding",
        to: "funding",
        icon: <StoreOutlinedIcon />,
        subItems: [...loans], // your existing funding loans list
      },
    ],
  },

  /* ----- Vocational ----- */
  {
    name: "Vocational",
    to: "pathways/vocational",
    icon: <StoreOutlinedIcon />,
    subItems: [
      {
        name: "dashboard",
        to: "vocationalDashboard",
        icon: <DashboardOutlinedIcon />,
      },
      { name: "Advisory Meeting", to: "advisory-meeting" },
      { name: "Vocational Program Selection", to: "program-selection" },
      { name: "Bank Statement Upload & Approval", to: "bank-statement-upload-approval" },
      { name: "Visa Process", to: "visa-process" },
    ],
  },

  /* ----- Cultural Exchange (J-1 Visa) ----- */
  {
    name: "Cultural Exchange",
    to: "pathways/cultural-exchange",
    icon: <FlightTakeoffOutlinedIcon />,
    subItems: [
      { name: "Orientation", to: "orientation" },
      { name: "Placement", to: "placement" },
      { name: "Document Upload", to: "document-upload" },
      { name: "Interviews (Sponsor & Host)", to: "interviews" },
      { name: "Host Confirmation", to: "host-confirmation" },
      { name: "Visa Process", to: "visa-process" },
    ],
  },

  /* ----- Permanent Residency (EB-2 NIW) ----- */
  {
    name: "Permanent Residency",
    to: "pathways/permanent-residency",
    icon: <BookOutlinedIcon />,
    subItems: [
      {
        name: "EB-2 NIW",
        to: "eb2-niw",
        subItems: [
          { name: "Petition Upload", to: "petition-upload" },
          { name: "Confirmation Letter Upload", to: "confirmation-letter-upload" },
          { name: "RFE Handling", to: "rfe-handling" },
          { name: "DS-260 Form", to: "ds-260-form" },
          { name: "Visa Process", to: "visa-process" },
        ],
      },
      {
        name: "DV Lottery",
        to: "dv-lottery",
        subItems: [
          { name: "Pre-selection: Interest Submission", to: "interest-submission" },
          { name: "Pending Member", to: "pending-member" },
          { name: "Completed Applications", to: "completed-applications" },
          { name: "Post-selection: Winners", to: "winners" },
          { name: "Package Enrollment (Bronze–Platinum)", to: "package-enrollment" },
          { name: "Visa Process", to: "visa-process" },
        ],
      },
    ],
  },

  /* ----- Visa Module (as a separate pathway) ----- */
  {
    name: "Visa Module",
    to: "pathways/visa",
    icon: <CreditCardOutlinedIcon />,
    subItems: [
      { name: "Document Upload", to: "document-upload" },
      { name: "DS-160/260 Review", to: "ds-review" },
      { name: "Visa Fee Payment", to: "visa-fee-payment" },
      { name: "Appointment Confirmation", to: "appointment-confirmation" },
      { name: "Training (T-21)", to: "training-t21" },
      { name: "Mock Interview (T-7)", to: "mock-interview-t7" },
      { name: "Visa Feedback", to: "visa-feedback" },
      // (Travel & Logistics remains at top-level shared per your rule)
    ],
  },
];

/* --------------- Exports in your existing shapes --------------- */
// keep your divider section but rename it to “Pathways”
// Show top links first, then "Pathways" divider,
// then all Pathways, and finally the Common items LAST.
const linksWithDivider = [
  // Top links
  ...linkItems.map((item) => ({ ...item, type: "link" })),

  // Pathways section
  { type: "divider", name: "Pathways", to: "", icon: null },
  ...pathways.map((item) => ({ ...item, type: "module" })),

  // NEW: divider between pathways and common items
  { type: "divider", name: "Common", to: "", icon: null },

  // Common section (Visa Processing, Travel & Logistics, etc.)
  ...commonItems.map((item) => ({ ...item, type: "module" })),
];


// (Optional) keep routes in the same display order:
const routes = [...linkItems, ...pathways, ...commonItems];

// Back-compat if something still imports `modules`
const modules = pathways;

export { modules, pathways, linkItems, routes, linksWithDivider };

