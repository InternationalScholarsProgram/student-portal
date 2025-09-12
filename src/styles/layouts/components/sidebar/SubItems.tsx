import { Collapse } from "@mui/material";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SidebarNavLink from "./SidebarNavLink";
import { useLocation } from "react-router-dom";

type Item = {
  name: string;
  to?: string;
  icon?: React.ReactNode;
  subItems?: Item[];
};

type Props = {
  item: Item;                               // current node
  prefix: string;                           // accumulated parent path, e.g. "pathways/academic"
  depth?: number;                           // nesting level (for indent)
  openSections: Record<string, boolean>;
  setOpenSections: (key: string) => void;
  onNavigate?: () => void;
};

const INDENT = 12; // px per level

function joinPath(prefix: string, to?: string) {
  if (!to) return prefix || "";
  if (!prefix) return to;
  return `${prefix.replace(/\/+$/, "")}/${to.replace(/^\/+/, "")}`;
}

export default function SubItems({
  item,
  prefix,
  depth = 0,
  openSections,
  setOpenSections,
  onNavigate,
}: Props) {
  const { pathname } = useLocation();

  const fullTo = joinPath(prefix, item.to); // unique key + base for children/links
  const sectionKey = item.to ? fullTo : `__group__:${item.name}`;
  const hasChildren = Array.isArray(item.subItems) && item.subItems.length > 0;

  // Auto-open if current route is under this node
  const isUnder =
    !!fullTo &&
    (pathname === `/${fullTo}` || pathname.startsWith(`/${fullTo}/`));

  const isOpen = openSections[sectionKey] ?? !!isUnder;

  const toggle = (e?: React.MouseEvent) => {
    e?.stopPropagation?.();
    setOpenSections(sectionKey);
  };

  return (
    <li className="col">
      {/* Header row container (no 'sidebar-link' here to avoid double borders) */}
      <div className="flex items-center gap-2">
        {item.to ? (
          // LINKED HEADER: only the NavLink gets 'sidebar-link'
          <SidebarNavLink
            to={`/${fullTo}`}
            onClick={onNavigate}
            className="sidebar-link flex items-center gap-2 flex-1"
            style={{ paddingLeft: depth * INDENT }}
          >
            {item.icon}
            <p className="text-left flex-1">{item.name}</p>
          </SidebarNavLink>
        ) : (
          // NON-LINK HEADER: a single button styled as 'sidebar-link'
          <button
            type="button"
            onClick={toggle}
            className="sidebar-link flex items-center gap-2 w-full text-left"
            style={{ paddingLeft: depth * INDENT }}
          >
            {item.icon}
            <p className="text-left flex-1">{item.name}</p>
            {hasChildren && (
              <span className="ml-auto px-2 py-1 opacity-70">
                {isOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
              </span>
            )}
          </button>
        )}

        {/* Caret button (separate & borderless) for linked headers with children */}
        {item.to && hasChildren && (
          <button
            type="button"
            onClick={toggle}
            className="caret-btn"
            aria-expanded={isOpen}
            aria-controls={`sub-${sectionKey}`}
            title={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
          </button>
        )}
      </div>

      {/* Children */}
      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit className="opacity-80">
          <div className="pl-[10%]">
            {item.subItems!.map((child, idx) => {
              const childKey = child.to || `${sectionKey}-${idx}`;
              const childHasChildren =
                Array.isArray(child.subItems) && child.subItems.length > 0;

              if (childHasChildren) {
                // Recurse for deeper levels
                return (
                  <SubItems
                    key={childKey}
                    item={child}
                    prefix={fullTo}
                    depth={depth + 1}
                    openSections={openSections}
                    setOpenSections={setOpenSections}
                    onNavigate={onNavigate}
                  />
                );
              }

              // Leaf link (only the NavLink has 'sidebar-link')
              const childTo = joinPath(fullTo, child.to);
              return (
                <SidebarNavLink
                  key={childKey}
                  to={`/${childTo}`}
                  onClick={onNavigate}
                  className="sidebar-link"
                  style={{ paddingLeft: (depth + 1) * INDENT }}
                >
                  <p className="first-letter:uppercase">{child.name}</p>
                </SidebarNavLink>
              );
            })}
          </div>
        </Collapse>
      )}
    </li>
  );
}
