import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "said", _id: 123 },
  isLoggedIn: false,
  isLoading: false,

  login: () => {
    set({ isLoading: true });
    console.log("hi you just logged in");
  },
}));
