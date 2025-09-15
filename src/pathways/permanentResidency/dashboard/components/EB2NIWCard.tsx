import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from "react-router-dom";
import { EB2NIWStatus } from "../services/permanentResidencyEndpoints";

type Props = { data?: EB2NIWStatus };

const EB2NIWCard: React.FC<Props> = ({ data }) => {
  const steps = [
    { key: "petition_upload", label: "Petition Upload", icon: <UploadFileIcon /> },
    { key: "confirmation_letter_upload", label: "Confirmation Letter Upload", icon: <AssignmentIndIcon /> },
    { key: "rfe_handling", label: "RFE Handling", icon: <HelpCenterIcon /> },
    { key: "ds_260_form", label: "DS-260 Form", icon: <AssignmentTurnedInIcon /> },
    { key: "visa_process", label: "Visa Process", icon: <CheckCircleOutlineIcon /> },
  ] as const;

  return (
    <section className="card p-4 col gap-3 min-w-0">
      <b className="title-sm text-primary-main">EB-2 NIW</b>
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
        <Link to="/pathways/permanent-residency/eb2-niw/petition-upload" className="text-primary-main underline">
          Manage Petition
        </Link>
        <Link to="/pathways/permanent-residency/eb2-niw/ds-260-form" className="text-primary-main underline">
          Fill DS-260
        </Link>
      </div>
    </section>
  );
};

export default EB2NIWCard;
