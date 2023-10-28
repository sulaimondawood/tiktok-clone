import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name?: string;
  email?: string;
  image?: string;
  _id?: string;
};

interface State {
  user: User | null;
}

interface Actions {
  updateUser: (user: User) => void;
  removeUser: () => void;
}

// Define a type for the Zustand store
type Store = State & Actions;

// Define a custom state creator
const createStore: StateCreator<Store> = (set) => ({
  user: null,
  updateUser: (user) => set({ user }),
  removeUser: () => {
    localStorage.removeItem("user");
  },
});

const useStore = create(
  persist(createStore, {
    name: "user",
  })
);

export default useStore;
