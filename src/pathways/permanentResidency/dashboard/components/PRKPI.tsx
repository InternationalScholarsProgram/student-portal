import { Link } from "react-router-dom";

type Props = { title: string; value: string; to: string };

const PRKPI: React.FC<Props> = ({ title, value, to }) => {
  return (
    <Link to={to} className="card p-4 col gap-1 hover:outline hover:outline-1">
      <p className="text-xs opacity-70">{title}</p>
      <b className="text-lg first-letter:uppercase">{value}</b>
      <span className="text-[11px] opacity-60">Open</span>
    </Link>
  );
};

export default PRKPI;
