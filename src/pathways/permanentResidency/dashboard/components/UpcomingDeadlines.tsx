import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { PRDeadline } from "../services/permanentResidencyEndpoints";

type Props = { items: PRDeadline[] };

const PRDeadlines: React.FC<Props> = ({ items }) => {
  const sorted = [...(items ?? [])].sort(
    (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
  );

  return (
    <section className="space-y-2">
      <div className="flex items-center gap-1.5">
        <EventIcon fontSize="small" className="text-primary-main" />
        <h3 className="text-sm font-semibold text-primary-main">Upcoming Deadlines</h3>
      </div>

      {sorted.length === 0 ? (
        <p className="text-xs opacity-60 py-2">No upcoming deadlines found.</p>
      ) : (
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {sorted.slice(0, 6).map((d, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded bg-paper border border-gray-100"
            >
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-xs font-medium truncate">{d.title}</p>
                {d.note && (
                  <p className="text-[10px] opacity-70 truncate mt-0.5">{d.note}</p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {d.link && (
                  <Link
                    to={d.link}
                    className="text-primary-main text-[10px] hover:underline"
                  >
                    Open
                  </Link>
                )}
                <span className="text-[10px] font-medium whitespace-nowrap">
                  {dayjs(d.date).format("MMM D")}
                </span>
              </div>
            </div>
          ))}
          {sorted.length > 6 && (
            <p className="text-[10px] opacity-60 text-center py-1">
              +{sorted.length - 6} more deadlines
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default PRDeadlines;
