import { create } from "zustand";
import { linksWithDivider } from "../../../../router/linkItems";

interface useSidebarStore {
  openSections: Record<string, boolean>;
  setOpenSections: (sectionName: string) => void;
  initialize: () => void;
  drawer: boolean;
  toggleDrawer: () => void;
}

const useSidebarStore = create<useSidebarStore>((set, get) => ({
  openSections: {},
  initialize: () => {
    const updatedSections: Record<string, boolean> = {};
    linksWithDivider.forEach((item: any) => {
      if (item?.subItems) {
        const isOpen = item?.subItems.some(
          (subItem: any) => `/${subItem?.to}` === window.location.pathname
        );
        updatedSections[item?.name] = isOpen;
      }
    });
    set({ openSections: updatedSections });
  },
  setOpenSections: (sectionName) => {
    const prevState = get().openSections;
    const newState = Object.keys(prevState).reduce((acc, key) => {
      acc[key] = key === sectionName ? !prevState[key] : false;
      return acc;
    }, {} as Record<string, boolean>);

    set({ openSections: newState });
  },
  drawer: false,
  toggleDrawer: () => {
    if (window.innerWidth < 1024) set({ drawer: !get().drawer });
  },
}));

export default useSidebarStore;
