import { create } from "zustand";
type FundingStore = {
  queryKey: any[];
  setQueryKey: (key: any) => void;
};
export const useFundingStore = create<FundingStore>((set) => ({
  queryKey: [],
  setQueryKey: (key: any) => set({ queryKey: key }),
}));
