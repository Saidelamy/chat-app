import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatsFound from "./NoChatsFound";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ChatList() {
  const { chats, getMyChatContacts, isMessagesLoading } = useChatStore();

  console.log("chats", chats);
  useEffect(() => {
    getMyChatContacts();
  }, [getMyChatContacts]);

  if (isMessagesLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;
  return (
    <>
      {chats?.map((chat) => {
        return (
          <div key={chat._id} className="text-black text-lg ">
            <div className="bg-gradient-to-r rounded-lg from-green-100/50 to-green-100 w-full  p-3 my-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="avatar online size-16">
                  <img
                    src={chat.profilePicture}
                    alt={chat.fullName}
                    className=" rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold">{chat.fullName}</h3>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChatList;
