import { toast } from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,

  isSigningUp: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res);
      set({ authUser: res.data });
    } catch (error) {
      console.log("error in checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Successfully registered!");
    } catch (error) {
      toast.error(
        "Error while register please try again later!.",
        error.response.data.message,
      );
      console.log("error when signing up ", error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
