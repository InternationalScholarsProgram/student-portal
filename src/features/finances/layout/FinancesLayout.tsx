import { Outlet } from "react-router";
import { create } from "zustand";

interface TransactionItemProps {
  selectedTransaction: any;
  setSelectedTransaction: (data: any) => void;
}

function FinancesLayout() {
  return <Outlet />;
}

export const useFinancesStore = create<TransactionItemProps>((set) => ({
  selectedTransaction: null,
  setSelectedTransaction: (data) => set({ selectedTransaction: data }),
}));
export default FinancesLayout;
