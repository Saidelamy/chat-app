import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center bg-green-800/20 border-b
   border-green-500 max-h-[96px] px-6 flex-1"
    >
      <div className="flex items-center space-x-3">
        <div className={`avatar ${true ? "online" : "offline"}`}>
          <div className="size-24">
            <img
              className="rounded-full"
              src={selectedUser.profilePicture || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium">{selectedUser.fullName}</h3>
          <p className="text-slate-200 text-sm">
            {true ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
export default ChatHeader;
