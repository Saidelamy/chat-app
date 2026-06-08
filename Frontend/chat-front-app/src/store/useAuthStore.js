import { toast } from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLogin: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
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
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Successfully registered!");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error when signing up ", error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      console.log(res.data);

      set({ authUser: res.data });
      toast.success("User Logged in successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error.response.data.message);
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error while logging out");
      console.log("error logging out", error.response.data.message);
    }
  },

  updateImageProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Image updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile image",
      );
    }
  },
}));
