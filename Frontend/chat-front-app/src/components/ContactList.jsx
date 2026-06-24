import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
  const { allContacts, getAllContacts, isContactsLoading, setSelectedUser } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);
  console.log(allContacts);

  if (isContactsLoading) return <UsersLoadingSkeleton />;
  return (
    <>
      <div className="flex-1 min-h-0 overflow-y-auto">
        {allContacts?.contacts?.map((contact) => {
          return (
            <div
              key={contact._id}
              className="text-gray-800 cursor-pointer "
              onClick={() => {
                setSelectedUser(contact);
              }}
            >
              <div className="bg-gradient-to-r rounded-lg from-green-100/50 to-green-100 w-full  p-3 my-2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`avatar size-16 ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}
                  >
                    <img
                      src={contact.profilePicture || "/avatar.png"}
                      alt={contact.fullName}
                      className=" rounded-full"
                    />
                  </div>
                  <h3 className="text-base font-bold">{contact.fullName}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ContactList;
