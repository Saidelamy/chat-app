import ActiveTab from "../components/ActiveTab";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";

function Chat() {
  const { activeTab } = useChatStore();

  return (
    <>
      <div className="w-full h-screen gap-10 grid grid-cols-[350px_1fr] container">
        <div className="bg-gradient-to-r from-slate-100/60 to-gray-200  border-r-2 border-green-500">
          <ProfileHeader />
          <ActiveTab />
          <div className="p-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
