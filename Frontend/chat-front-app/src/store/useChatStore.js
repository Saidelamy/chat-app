import { toast } from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isContactsLoading: false,
  isMessagesLoading: false,

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });

    if (selectedUser) {
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat._id === selectedUser._id ? { ...chat, unreadCount: 0 } : chat,
        ),
      }));

      axiosInstance.put(`/messages/read/${selectedUser._id}`).catch((error) => {
        console.error("Failed to mark messages as read:", error);
      });
    }
  },

  getAllContacts: async () => {
    set({ isContactsLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isContactsLoading: false });
    }
  },

  resetChatState: () => {
    get().unsubscribeFromMessages();
    set({
      allContacts: [],
      chats: [],
      messages: [],
      activeTab: "chats",
      selectedUser: null,
      isContactsLoading: false,
      isMessagesLoading: false,
    });
  },

  getMessagesById: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      reciverId: selectedUser._id,
      message: messageData.message,
      image: messageData.image,
      createdAt: new Date().toISOString(),
    };
    set({ messages: [...messages, optimisticMessage] });
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      set({ messages: messages }); // if server error optimistic message will be removed
      toast.error(error.response?.data?.message);
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore?.getState()?.socket;

    socket.on("newMessage", (newMessage) => {
      const { selectedUser, messages, chats } = get();

      const isMessageFromSelectedUser =
        newMessage.senderId === selectedUser?._id;

      if (isMessageFromSelectedUser) {
        set({ messages: [...messages, newMessage] });
      }

      const chatExists = chats.some((chat) => chat._id === newMessage.senderId);

      if (chatExists) {
        set({
          chats: chats.map((chat) =>
            chat._id === newMessage.senderId
              ? {
                  ...chat,
                  lastMessage: newMessage.message || "📷 Photo",
                  lastMessageTime: newMessage.createdAt,
                  unreadCount: isMessageFromSelectedUser
                    ? 0
                    : (chat.unreadCount || 0) + 1,
                }
              : chat,
          ),
        });
      } else {
        get().getMyChatContacts();
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));
