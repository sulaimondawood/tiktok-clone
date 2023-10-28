import { create } from "zustand";

type ShowLoginState = {
  showLogins: boolean;
  setShowLogins: (param: boolean) => void;
};

export const useAppState = create<ShowLoginState>()((set) => ({
  showLogins: false,
  setShowLogins: (param) => set({ showLogins: param }),
}));
