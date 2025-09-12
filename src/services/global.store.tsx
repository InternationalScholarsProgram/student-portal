import { create } from "zustand";

type StudentStore = {
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
};

type GlobalStore = StudentStore & {
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
  activeStudentId: "",
  setActiveStudentId: (id) => set({ activeStudentId: id }),
}));

export default useGlobalStore;
