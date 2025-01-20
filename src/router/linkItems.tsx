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

const linkItems = [
  {
    icon: <DashboardOutlinedIcon />,
    name: "Dashboard",
    to: "",
  },
  {
    icon: <PersonOutlineOutlinedIcon />,
    name: "Profile",
    to: "profile",
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
        to: "switch-option",
      },
      {
        name: "Withdraw",
        to: "withdraw",
      },
    ],
  },
  {
    icon: <SupportAgentOutlinedIcon />,
    name: "Open Ticket",
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
    ],
  },
  {
    to: "school-admission-requirements",
    name: "School Admission",
    icon: <SchoolOutlinedIcon />,
  },
  {
    name: "School Admission",
    to: "school-admission-application",
    icon: <SchoolOutlinedIcon />,
    hidden: true,
  },
  {
    name: "Funding",
    to: "funding",
    icon: <StoreOutlinedIcon />,
  },
  {
    name: "Visa Processing",
    to: "visa-processing",
    icon: <CreditCardOutlinedIcon />,
  },
  {
    name: "Travel and Logistics",
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
