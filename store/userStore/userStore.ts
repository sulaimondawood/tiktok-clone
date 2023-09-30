import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name?: string;
  email?: string;
  image?: string;
  _id?: string;
};

interface State {
  user: User;
}

interface Actions {
  updateUser: (user: User) => void;
  removeUser: () => void;
}

// Define a type for the Zustand store
type Store = State & Actions;

// Define a custom state creator
const createStore: StateCreator<Store> = (set) => ({
  user: {},
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

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// type User = {
//   name?: string;
//   email?: string;
//   image?: string;
//   _id?: string;
// };

// type State = {
//   user: any;
// };

// type Actions = {
//   updateUser: (user: any) => void;
//   removeUser: () => void;
// };

// const useStore = create(
//   persist(
//     (set: any) => ({
//       user: {},
//       updateUser: (user: User) => set({ user: user }),
//       removeUser: () => {
//         localStorage.removeItem("user");
//       },
//     }),
//     {
//       name: "user",
//     }
//   )
// );

// export default useStore;
