import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Props = {
  label: string;
  ctaLabel: string;
  to: string;
  helper?: string;
};

const NextActionCard: React.FC<Props> = ({ label, ctaLabel, to, helper }) => {
  return (
    <div className="card col justify-between p-4 min-h-[120px]">
      <b className="text-primary-main">Next Action</b>
      <p className="text-sm">{label}</p>
      {helper && <p className="text-xs opacity-70">{helper}</p>}
      <Link
        to={to}
        className="mt-2 inline-flex items-center gap-1 text-primary-main hover:underline text-sm"
      >
        {ctaLabel} <ArrowForwardIcon fontSize="small" />
      </Link>
    </div>
  );
};

export default NextActionCard;
