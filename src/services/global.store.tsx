import { create } from "zustand";

type GlobalStore = {
  breadCrumbs: string[];
  setBreadCrumbs: (crumbs: string[]) => void;
  breadCrumbsLabel: string;
  setBreadCrumbsLabel: (label: string) => void;
};

const useGlobalStore = create<GlobalStore>((set) => ({
  breadCrumbs: [],
  setBreadCrumbs: (crumbs: string[]) => set({ breadCrumbs: crumbs }),
  breadCrumbsLabel: "",
  setBreadCrumbsLabel: (label: string) => set({ breadCrumbsLabel: label }),
}));
export default useGlobalStore;
