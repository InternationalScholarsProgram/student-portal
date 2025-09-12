import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

type R = { title: string; type: "video" | "pdf" | "link"; to: string };
type Props = { resources: R[] };

const icon = (t: R["type"]) =>
  t === "video" ? (
    <PlayCircleOutlineOutlinedIcon fontSize="small" />
  ) : t === "pdf" ? (
    <PictureAsPdfOutlinedIcon fontSize="small" />
  ) : (
    <LinkOutlinedIcon fontSize="small" />
  );

const InfoResources: React.FC<Props> = ({ resources }) => {
  return (
    <div className="card p-4">
      <h3 className="title-sm text-primary-main">Info Resources</h3>
      <ul className="mt-2 col gap-2">
        {resources?.map((r) => (
          <li key={r.title} className="row items-center justify-between gap-2 border-b pb-2">
            <div className="row items-center gap-2">
              {icon(r.type)}
              <p className="text-sm">{r.title}</p>
            </div>
            <a href={r.to} className="text-primary-main text-xs underline">
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoResources;
