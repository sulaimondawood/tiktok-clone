import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  _id?: string;
  _type?: string;
  name?: string;
  image?: string;
};

interface State {
  user: User | null;
}

interface Actions {
  updateUser: (user: User | any) => void;
  removeUser: () => void;
}

// Define a type for the Zustand store
type Store = State & Actions;

// Define a custom state creator
const createStore: StateCreator<Store> = (set) => ({
  user: null,
  updateUser: (user) => set({ user }),
  removeUser: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
});

const useStore = create(
  persist(createStore, {
    name: "user",
  })
);

export default useStore;
