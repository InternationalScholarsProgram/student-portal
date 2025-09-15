import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";

const links = [
  { label: "Upload EB-2 Petition", to: "/pathways/permanent-residency/eb2-niw/petition-upload" },
  { label: "Complete DS-260", to: "/pathways/permanent-residency/eb2-niw/ds-260-form" },
  { label: "Submit DV Interest", to: "/pathways/permanent-residency/dv-lottery/interest-submission" },
  { label: "DV Package Enrollment", to: "/pathways/permanent-residency/dv-lottery/package-enrollment" },
  { label: "Visa Module", to: "/pathways/visa/document-upload" },
];

const PRQuickActions = () => {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>

      <div className="space-y-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-blue-50 border hover:border-blue-200 transition-all duration-200 group"
          >
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 truncate pr-2">
              {l.label}
            </span>
            <LaunchIcon
              fontSize="small"
              className="flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PRQuickActions;
