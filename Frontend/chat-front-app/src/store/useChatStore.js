import { toast } from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
  allContacts: [],
  chats: [],
  messages: [],
  isContactsLoading: false,
  isMessagesLoading: false,

  getAllContacts: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
      console.log(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isContactsLoading: false });
    }
  },

  getMyChatContacts: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isContactsLoading: false });
    }
  },

  getMessagesById: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
