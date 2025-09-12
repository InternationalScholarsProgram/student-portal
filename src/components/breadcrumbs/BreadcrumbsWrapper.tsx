import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import BreadCrumbs from "./Breadcrumbs";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { getLabels } from "../../router/utils";
import useGlobalStore from "../../services/global.store";

function splitPathname(pathname: string): string[] {
  return pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
}

function BreadcrumbsWrapper() {
  const { breadCrumbsLabel, setBreadCrumbsLabel, setBreadCrumbs } =
    useGlobalStore();
  const { pathname } = useLocation();

  useEffect(() => {
    const segments = splitPathname(pathname || "/");
    const last = segments[segments.length - 1] ?? "";
    setBreadCrumbs(segments);                 // keep store array in sync (if used elsewhere)
    setBreadCrumbsLabel(getLabels(last));     // header title
  }, [pathname, setBreadCrumbs, setBreadCrumbsLabel]);

  return (
    <header className="headers">
      <h1 className="header-title first-letter:uppercase">
        {breadCrumbsLabel}
      </h1>
      <div className="flex-1 px-3 hidden sm:flex flex-row justify-end items-center h-full">
        <NavLink className="row items-center gap-2" to="/">
          <HomeOutlinedIcon fontSize="small" /> <p>›</p>
        </NavLink>
        <BreadCrumbs />
      </div>
    </header>
  );
}

export default BreadcrumbsWrapper;
