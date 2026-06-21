import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLogin: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log(res);
      set({ authUser: res.data });

      get().connectSocket();
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

      get().connectSocket();
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

      get().connectSocket();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");

      get().disconnectSocket();
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

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get()?.socket?.connected) return;

    const socket = io(BASE_URL, { withCredentials: true });

    socket.connect();
    set({ socket });

    // listen for online user
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
