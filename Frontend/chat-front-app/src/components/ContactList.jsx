import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

function ContactList() {
  const { allContacts, getAllContacts } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);
  console.log(allContacts);
  return (
    <>
      {allContacts?.contacts?.map((contact) => {
        return (
          <div key={contact._id} className="text-gray-800">
            <button className="bg-gradient-to-r rounded-lg from-green-100/50 to-green-100 w-full  p-6 my-2">
              {contact.fullName}
            </button>
          </div>
        );
      })}
    </>
  );
}

export default ContactList;
