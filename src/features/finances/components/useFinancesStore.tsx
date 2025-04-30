import { create } from "zustand";

interface TransactionItemProps {
  selectedTransaction: any;
  setSelectedTransaction: (data: any) => void;
  openModal: boolean;
  toggleModal: () => void;
}
const useFinancesStore = create<TransactionItemProps>((set) => ({
  selectedTransaction: null,
  setSelectedTransaction: (data) => set({ selectedTransaction: data }),
  openModal: false,
  toggleModal: () => set((state) => ({ openModal: !state.openModal })),
}));

export default useFinancesStore;
