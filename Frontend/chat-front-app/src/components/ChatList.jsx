import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ChatList() {
  const { chats, getMyChatContacts, isMessagesLoading, setSelectedUser } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatContacts();
  }, [getMyChatContacts]);

  if (isMessagesLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  // الأحدث رسالة تطلع فوق
  const sortedChats = [...chats].sort(
    (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime),
  );

  return (
    <>
      {sortedChats?.map((chat) => {
        return (
          <div
            key={chat._id}
            className="text-black text-lg cursor-pointer"
            onClick={() => {
              setSelectedUser(chat);
            }}
          >
            <div className="bg-gradient-to-r rounded-lg from-green-100/50 to-green-100 w-full p-3 my-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div
                    className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"} size-16`}
                  >
                    <img
                      src={chat.profilePicture || "/avatar.png"}
                      alt={chat.fullName}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold">{chat.fullName}</h3>
                  <p className="text-sm text-gray-500 truncate max-w-[180px]">
                    {chat.lastMessage || "ابدأ المحادثة"}
                  </p>
                </div>
              </div>

              {/* عدد الرسايل اللي وصلت */}
              {chat.unreadCount > 0 && (
                <span className="bg-green-600 text-white text-xs font-bold rounded-full size-6 flex items-center justify-center shrink-0">
                  {chat.unreadCount > 9 ? "+9" : chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChatList;
