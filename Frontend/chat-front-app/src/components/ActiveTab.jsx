import { useChatStore } from "../store/useChatStore";

function ActiveTab() {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <>
      <div className="tabs tabs-boxed bg-transparent p-2 m-2 bg-green-600">
        <button
          onClick={() => setActiveTab("chats")}
          className={`tab ${
            activeTab === "chats"
              ? "bg-green-500 text-white"
              : "text-green-500 bg-green-200/50"
          }`}
        >
          Chats
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`tab ${
            activeTab === "contacts"
              ? "bg-green-500 text-white"
              : "text-green-500 bg-green-200/50"
          }`}
        >
          Contacts
        </button>
      </div>
    </>
  );
}

export default ActiveTab;
