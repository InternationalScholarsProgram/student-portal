import { Breadcrumbs } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getLabels } from "../../router/utils";
import useGlobalStore from "../../services/global.store";

const BreadCrumbs = () => {
  const { breadCrumbs } = useGlobalStore();
  return (
    <Breadcrumbs className="pl-1" separator="›" aria-label="breadcrumb">
      {breadCrumbs?.map((path: string, index: any) => {
        const to = `/${breadCrumbs.slice(0, index + 1).join("/")}`;
        const isLast = index === breadCrumbs.length - 1;
        return (
          <NavLink
            key={to}
            to={to}
            className={` text-sm ${isLast ? "text-primary-light" : ""}`}
            aria-current={isLast ? "page" : undefined}
          >
            <span className="first-letter:uppercase">{getLabels(path)}</span>
          </NavLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
