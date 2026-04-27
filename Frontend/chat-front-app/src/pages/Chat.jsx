import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function Chat() {
  const { logout } = useAuthStore();

  const { allContacts, chats, getAllContacts, getMyChatContacts } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
    getMyChatContacts();
  }, [getAllContacts, getMyChatContacts]);

  console.log("contacts:", allContacts);
  console.log("chats:", chats);
  return (
    <div>
      <button className="btn" onClick={logout}>
        click logout
      </button>
    </div>
  );
}

export default Chat;
