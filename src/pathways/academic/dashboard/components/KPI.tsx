import { Link } from "react-router-dom";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";

const iconMap: Record<string, JSX.Element> = {
  Admission: <SchoolOutlinedIcon color="primary" />,
  Funding: <PaymentsOutlinedIcon color="info" />,
  Visa: <CreditCardOutlinedIcon color="action" />,
  Travel: <FlightTakeoffOutlinedIcon color="success" />,
};

type Props = { title: "Admission" | "Funding" | "Visa" | "Travel"; value: string; to: string };

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
