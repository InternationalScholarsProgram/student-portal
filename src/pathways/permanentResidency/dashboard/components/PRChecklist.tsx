type Item = { name: string; status: "missing" | "pending" | "approved"; link?: string };
type Props = { items: Item[] };

const statusClass = (s: Item["status"]) =>
  s === "approved"
    ? "bg-green-100 text-green-700"
    : s === "pending"
    ? "bg-yellow-100 text-yellow-700"
    : "bg-red-100 text-red-700";

const PRChecklist: React.FC<Props> = ({ items }) => {
  return (
    <div className="card p-4">
      <h3 className="title-sm text-primary-main">Required Documents</h3>
      <ul className="mt-2 col gap-2">
        {items?.map((it) => (
          <li key={it.name} className="row items-center justify-between gap-2 border-b pb-2">
            <p className="text-sm">{it.name}</p>
            <div className="row items-center gap-3">
              <span className={`px-2 py-[2px] rounded-md text-xs ${statusClass(it.status)}`}>
                {it.status}
              </span>
              {it.link && (
                <a href={it.link} className="text-primary-main text-xs underline">
                  Open
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PRChecklist;
