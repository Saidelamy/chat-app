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
              ? "bg-cyan-500/20 text-cyan-300"
              : "text-slate-100"
          }`}
        >
          Chats
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`tab ${
            activeTab === "contacts"
              ? "bg-cyan-500/20 text-cyan-300"
              : "text-slate-100"
          }`}
        >
          Contacts
        </button>
      </div>
    </>
  );
}

export default ActiveTab;
