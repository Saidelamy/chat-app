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
          <div key={contact._id}>
            <p>{contact.fullName}</p>
          </div>
        );
      })}
    </>
  );
}

export default ContactList;
