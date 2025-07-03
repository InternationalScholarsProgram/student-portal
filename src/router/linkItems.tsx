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
import { loans } from "../features/funding/utils";

const linkItems = [
  {
    icon: <DashboardOutlinedIcon />,
    name: "Dashboard",
    to: "dashboard",
  },
  {
    icon: <PersonOutlineOutlinedIcon />,
    name: "Profile",
    to: "profile",
    hidden: true,
  },
  {
    icon: <EmailOutlinedIcon />,
    name: "WebMail",
    to: "webmail",
  },
  {
    icon: <LibraryBooksOutlinedIcon />,
    name: "Info Resources",
    to: "resources",
  },

  {
    icon: <PaymentsOutlinedIcon />,
    name: "Finances",
    to: "finances",
    subItems: [
      {
        name: "Make Payments",
        to: "make-payments",
      },
      {
        name: "Account Statements",
        to: "account-statements",
      },
    ],
  },
  {
    icon: <BookOutlinedIcon />,
    name: "Program Options",
    to: "program-options",
    subItems: [
      {
        name: "Switch Options",
        to: "switch",
      },
      {
        name: "Withdraw",
        to: "withdraw",
      },
    ],
  },
  {
    icon: <SupportAgentOutlinedIcon />,
    name: "Tickets",
    to: "tickets",
    subItems: [
      {
        name: "Create Ticket",
        to: "create-ticket",
      },
      {
        name: "View Tickets",
        to: "view-tickets",
      },
    ],
  },
];

const modules = [
  {
    name: "Entrance Exams",
    to: "entrance-exams",
    icon: <AutoStoriesOutlinedIcon />,
    subItems: [
      {
        name: "GMAT",
        to: "gmat",
      },
      {
        name: "GRE",
        to: "gre",
      },
      {
        name: "Duolingo",
        to: "duolingo",
      },
    ],
  },

  {
    name: "School Admission",
    to: "school-admission",
    icon: <SchoolOutlinedIcon />,
    subItems: [
      {
        name: "Requirements",
        to: "requirements",
      },
      {
        name: "Applications",
        to: "application",
      },
    ],
  },

  {
    name: "Funding",
    to: "funding",
    icon: <StoreOutlinedIcon />,
    subItems: [...loans],
  },
  {
    name: "Visa Processing",
    to: "visa-processing",
    icon: <CreditCardOutlinedIcon />,
  },
  {
    name: "Travel & Logistics",
    to: "logistics",
    icon: <FlightTakeoffOutlinedIcon />,
    subItems: [
      {
        name: "Accommodations",
        to: "accommodations",
      },
      {
        name: "Flight",
        to: "flights",
      },
      {
        name: "Pick Up",
        to: "pick-up",
      },
    ],
  },
];
const linksWithDivider = [
  ...linkItems.map((item) => ({ ...item, type: "link" })),
  { type: "divider", name: "Modules", to: "", icon: null },
  ...modules.map((item) => ({ ...item, type: "module" })),
];
const routes = [...linkItems, ...modules];

export { modules, linkItems, routes, linksWithDivider };
