import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type User = {
  name?: string;
  email?: string;
  image?: string;
};

type State = {
  user: any;
};

type Actions = {
  updateUser: (user: any) => void;
  removeUser: () => void;
};

const useStore = create(
  persist(
    (set: any) => ({
      user: null,
      updateUser: (user: any) => set({ user: user }),
      removeUser: () => set({ user: {} }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useStore;
