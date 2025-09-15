import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";
import { DVLotteryStatus } from "../services/permanentResidencyEndpoints";

type Props = { data?: DVLotteryStatus };

const DVLotteryCard: React.FC<Props> = ({ data }) => {
  const steps = [
    { key: "interest_submission", label: "Pre-selection: Interest Submission", icon: <HowToVoteIcon /> },
    { key: "pending_member", label: "Pending Member", icon: <PersonSearchIcon /> },
    { key: "completed_applications", label: "Completed Applications", icon: <DoneAllIcon /> },
    { key: "winners", label: "Post-selection: Winners", icon: <EmojiEventsIcon /> },
    { key: "package_enrollment", label: "Package Enrollment (Bronze–Platinum)", icon: <WorkspacePremiumIcon /> },
    { key: "visa_process", label: "Visa Process", icon: <CheckCircleOutlineIcon /> },
  ] as const;

  return (
    <section className="card p-4 col gap-3 min-w-0">
      <b className="title-sm text-primary-main">DV-Lottery</b>
      <ul className="col gap-2">
        {steps.map((s) => {
          const done = data?.[s.key] === true;
          return (
            <li key={s.key} className="row items-center justify-between p-2 rounded-md bg-paper">
              <div className="row items-center gap-3 min-w-0">
                {s.icon}
                <p className="font-medium text-sm truncate">{s.label}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  done ? "bg-green-500/15 text-green-700" : "bg-yellow-500/15 text-yellow-700"
                }`}
              >
                {done ? "Completed" : "Pending"}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="row gap-2 justify-end pt-2">
        <Link to="/pathways/permanent-residency/dv-lottery/interest-submission" className="text-primary-main underline">
          Submit Interest
        </Link>
        <Link to="/pathways/permanent-residency/dv-lottery/package-enrollment" className="text-primary-main underline">
          Enroll Package
        </Link>
      </div>
    </section>
  );
};

export default DVLotteryCard;
