import ActiveTab from "../components/ActiveTab";
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import NoConversation from "../components/NoConversation";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";

function Chat() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <>
      <div className="w-full h-screen  grid grid-cols-[350px_1fr] container">
        {/* left */}
        <div className="bg-gradient-to-r from-slate-200 to-gray-300  border-r-2 border-green-500">
          <ProfileHeader />
          <ActiveTab />
          <div className="p-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* right */}

        <div className="bg-gradient-to-t from-slate-100 to-gray-300 ">
          {selectedUser ? <ChatContainer /> : <NoConversation />}
        </div>
      </div>
    </>
  );
}

export default Chat;
