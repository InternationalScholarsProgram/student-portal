import { useLocation } from "react-router";
import BreadCrumbs from "./Breadcrumbs";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { getLabels } from "../../router/utils";

function BreadcrumbsWrapper() {
  const location = useLocation();
  const pathnames = location.pathname.split("/");
  const filter = pathnames.filter((item) => item !== "");
  const lastSegment = pathnames[pathnames.length - 1];

  return (
    <header className="headers">
      <h1 className="header-title">{getLabels(lastSegment)}</h1>
      <div className="flex-1 px-3 hidden sm:flex flex-row justify-end items-center h-full">
        <NavLink className="row items-center gap-2" to="/">
          <HomeOutlinedIcon fontSize="small" /> <p>›</p>
        </NavLink>
        <BreadCrumbs pathnames={filter} />
      </div>
    </header>
  );
}

export default BreadcrumbsWrapper;
