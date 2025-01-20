import { Breadcrumbs } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getLabels } from "../../router/utils";

const BreadCrumbs = ({ pathnames }: any) => {
  return (
    <Breadcrumbs className="pl-1" separator="›" aria-label="breadcrumb">
      {pathnames?.map((path: any, index: any) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const label = getLabels(path);
        return (
          <NavLink
            key={to}
            to={to}
            className={`text-sm ${isLast ? "text-primary-light" : ""}`}
            aria-current={isLast ? "page" : undefined}
          >
            {label}
          </NavLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
