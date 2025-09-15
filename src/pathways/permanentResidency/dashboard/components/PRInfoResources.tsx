type Resource = { title: string; description?: string; link: string };
type Props = { resources: Resource[] };

const PRInfoResources: React.FC<Props> = ({ resources }) => {
  return (
    <div className="card p-4">
      <h3 className="title-sm text-primary-main">Info Resources</h3>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(resources ?? []).map((r) => (
          <a
            key={r.title}
            href={r.link}
            target="_blank"
            rel="noreferrer"
            className="resource hover:outline hover:outline-1"
          >
            <b className="text-sm">{r.title}</b>
            {r.description && <p className="text-xs opacity-80 mt-1">{r.description}</p>}
          </a>
        ))}
        {(!resources || resources.length === 0) && (
          <p className="opacity-70 text-sm">No resources available yet.</p>
        )}
      </div>
    </div>
  );
};

export default PRInfoResources;
