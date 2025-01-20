import { create } from "zustand";
interface User {
  country: string;
  email: string;
  fullNames: string;
  contributions: number;
  programOption: string;
  balance: number;
  withdrawal: {
    withdrwal_status: number;
    report: string;
    rejected: boolean;
    reject_message: string;
  };
}

interface UserStoreTypes {
  user: User;
  setUser: (user: any) => void;
  programOptions: string[];
}

const useUserStore = create<UserStoreTypes>((set, get) => ({
  programOptions: ["Prime", "Regular"],
  user: {
    country: "Kenya",
    email: "test_three@gmail.com",
    fullNames: "test three",
    programOption: "Prime",
    balance: 600,
    contributions: 0,
    withdrawal: {
      withdrwal_status: 0,
      report: "requested",
      rejected: true,
      reject_message: "",
    },
  },
  setUser: (data) => set({ user: { ...get().user, ...data } }),
}));

export default useUserStore;
