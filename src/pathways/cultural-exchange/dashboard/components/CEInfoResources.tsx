type Resource = {
  type: "video" | "pdf" | "link";
  title: string;
  description?: string;
  url: string;
};

type Props = { resources: Resource[] };

const CEInfoResources: React.FC<Props> = ({ resources }) => {
  return (
    <div className="card p-4">
      <h3 className="title-sm text-primary-main">Info Resources</h3>
      <ul className="mt-2 col gap-2">
        {resources?.map((r) => (
          <li key={r.url} className="row items-center justify-between gap-2 border-b pb-2">
            <div className="col">
              <p className="text-sm">{r.title}</p>
              {r.description && <span className="text-xs opacity-70">{r.description}</span>}
            </div>
            <a href={r.url} target="_blank" rel="noreferrer" className="text-primary-main text-xs underline">
              {r.type === "video" ? "Watch" : r.type === "pdf" ? "Open PDF" : "Open"}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CEInfoResources;
