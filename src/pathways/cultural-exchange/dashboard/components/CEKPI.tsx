import { Link } from "react-router-dom";

type Props = { title: string; value: string; to: string };

const CEKPI: React.FC<Props> = ({ title, value, to }) => {
  return (
    <Link to={to} className="card p-4 col justify-between min-h-[110px]">
      <b className="text-primary-main">{title}</b>
      <p className="text-sm">{value}</p>
      <span className="text-xs opacity-60">Open</span>
    </Link>
  );
};

export default CEKPI;
