import { create } from "zustand";
import { Resources } from "../types/examTypes";

type ExamsStore = {
  sections: Resources[];
  sectionCount: number;
  setSectionCount: (sections: number) => void;
  setSections: (sections: any) => void;
};

const useExamsStore = create<ExamsStore>((set) => ({
  sections: [],
  sectionCount: 0,
  setSectionCount: (count: number) => set({ sectionCount: count }),
  setSections: (sections: any) => set({ sections }),
}));

export default useExamsStore;
