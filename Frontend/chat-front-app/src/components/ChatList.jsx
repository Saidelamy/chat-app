import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

function ChatList() {
  const { chats, getMyChatContacts } = useChatStore();

  useEffect(() => {
    getMyChatContacts();
  }, [getMyChatContacts]);

  console.log("chats:", chats);
  return (
    <>
      {chats?.map((chat) => {
        return (
          <div key={chat._id} className="text-black text-lg ">
            <button className="bg-gradient-to-r rounded-lg from-green-100/50 to-green-100 w-full  p-6 my-2">
              {chat.fullName}
            </button>
          </div>
        );
      })}
    </>
  );
}

export default ChatList;
