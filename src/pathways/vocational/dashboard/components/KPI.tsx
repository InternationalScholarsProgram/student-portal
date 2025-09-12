import { Link } from "react-router-dom";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const iconMap: Record<string, JSX.Element> = {
  Advisory: <EventAvailableOutlinedIcon color="primary" />,
  Program: <SchoolOutlinedIcon color="info" />,
  "Bank Statement": <AccountBalanceOutlinedIcon color="action" />,
  Visa: <CreditCardOutlinedIcon color="success" />,
};

type Props = { title: "Advisory" | "Program" | "Bank Statement" | "Visa"; value: string; to: string };

const KPI: React.FC<Props> = ({ title, value, to }) => {
  return (
    <Link to={to} className="card col p-4 hover:outline hover:outline-1 hover:bg-primary-main/10">
      <div className="row items-center gap-2">
        {iconMap[title]}
        <b className="text-sm">{title}</b>
      </div>
      <p className="text-xs opacity-70 mt-1">{value}</p>
    </Link>
  );
};

export default KPI;
