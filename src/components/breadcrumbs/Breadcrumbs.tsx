import { Breadcrumbs } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { getLabels } from "../../router/utils";

function splitPathname(pathname: string): string[] {
  return pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
}

const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const segments = splitPathname(pathname);

  return (
    <Breadcrumbs className="pl-1" separator="›" aria-label="breadcrumb">
      {segments.map((seg, index) => {
        const to = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        return (
          <NavLink
            key={to}
            to={to}
            className={`text-sm ${isLast ? "text-primary-light" : ""}`}
            aria-current={isLast ? "page" : undefined}
          >
            <span className="first-letter:uppercase">{getLabels(seg)}</span>
          </NavLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
