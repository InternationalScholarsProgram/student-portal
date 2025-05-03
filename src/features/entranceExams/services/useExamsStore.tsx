import { create } from "zustand";
import { Resources } from "../types/examTypes";

type ExamsStore = {
  sections: Resources[];
  resource: any[];
  sectionCount: number;
  setSectionCount: (sections: number) => void;
  setSections: (sections: any) => void;
  setResource: (resource: any) => void;
};

const useExamsStore = create<ExamsStore>((set) => ({
  sections: [],
  resource: [],
  sectionCount: 0,
  setSectionCount: (count: number) => set({ sectionCount: count }),
  setSections: (sections: any) => set({ sections }),
  setResource: (resource: any) => set({ resource }),
}));

export default useExamsStore;
