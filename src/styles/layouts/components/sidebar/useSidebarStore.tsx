import { create } from "zustand";
import { linksWithDivider } from "../../../../router/linkItems";

type NavNode = {
  type?: "link" | "module" | "divider";
  name: string;
  to?: string;
  icon?: React.ReactNode | null;
  subItems?: NavNode[];
};

interface SidebarState {
  openSections: Record<string, boolean>;
  setOpenSections: (key: string) => void;
  initialize: () => void;

  drawer: boolean;
  openDrawer: (force?: boolean) => void;
  closeDrawer: (force?: boolean) => void;
  toggleDrawer: (force?: boolean) => void;
}

const join = (a?: string, b?: string) => {
  if (!a) return b ?? "";
  if (!b) return a;
  return `${a.replace(/\/+$/, "")}/${b.replace(/^\/+/, "")}`;
};

const isDivider = (n: NavNode): boolean => n?.type === "divider";
const hasChildren = (n: NavNode): n is NavNode & { subItems: NavNode[] } =>
  Array.isArray(n?.subItems) && n.subItems.length > 0;

function walkAndMarkOpen(
  items: NavNode[],
  prefix: string,
  pathname: string,
  open: Record<string, boolean>
) {
  for (const it of items) {
    if (isDivider(it)) continue;

    const fullTo = join(prefix, it.to);
    const sectionKey = it.to ? fullTo : `__group__:${it.name}`;

    const isUnder =
      !!fullTo &&
      (pathname === `/${fullTo}` || pathname.startsWith(`/${fullTo}/`));

    if (isUnder) open[sectionKey] = true;

    if (hasChildren(it)) {
      walkAndMarkOpen(it.subItems, fullTo, pathname, open);
    }
  }
}

const shouldUseDrawer = () =>
  typeof window !== "undefined" && window.innerWidth < 1024;

const useSidebarStore = create<SidebarState>((set) => ({
  openSections: {},

  initialize: () => {
    const open: Record<string, boolean> = {};
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "/";

    const list = (linksWithDivider as unknown) as NavNode[];
    walkAndMarkOpen(list, "", pathname, open);

    set({ openSections: open });
  },

  setOpenSections: (key) =>
    set((state) => ({
      openSections: { ...state.openSections, [key]: !state.openSections[key] },
    })),

  // Drawer controls
  drawer: false,
  openDrawer: (force = false) =>
    set((s) => (force || shouldUseDrawer() ? { drawer: true } : s)),
  closeDrawer: (force = false) =>
    set((s) => (force || shouldUseDrawer() ? { drawer: false } : s)),
  toggleDrawer: (force = false) =>
    set((s) =>
      force || shouldUseDrawer() ? { drawer: !s.drawer } : s
    ),
}));

export default useSidebarStore;
