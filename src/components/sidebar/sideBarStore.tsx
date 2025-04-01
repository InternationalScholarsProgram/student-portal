import { createStore } from "zustand";
import { linksWithDivider } from "../../router/linkItems";

interface SidebarStore {
  openSections: Record<string, boolean>;
  setOpenSections: (sectionName: string) => void;
  initialize: () => void;
  drawer: boolean;
  toggleDrawer: () => void;
}

const sideBarStore = createStore<SidebarStore>((set, get) => ({
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
  toggleDrawer: () => set({ drawer: !get().drawer }),
}));

export default sideBarStore;
