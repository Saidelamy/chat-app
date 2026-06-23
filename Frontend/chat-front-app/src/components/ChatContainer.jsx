import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";
import NoChatHistory from "./NoChatHistory";
function ChatContainer() {
  const {
    selectedUser,
    getMessagesById,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    sendMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const refEndMessages = useRef(null);

  useEffect(() => {
    getMessagesById(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesById,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (refEndMessages.current) {
      refEndMessages.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <ChatHeader />

      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {messages?.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${message.senderId === authUser._id ? "bg-green-600 text-white" : "bg-slate-700 text-white"}`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {message.message && <p className="mt-2">{message.message}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={refEndMessages} />
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistory
            name={selectedUser.fullName}
            sendMessage={sendMessage}
          />
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
