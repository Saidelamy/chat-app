import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function Chat() {
  const { authUser, isLoading, login } = useAuthStore();

  console.log(authUser, isLoading);
  return (
    <div>
      <button className="btn" onClick={login}>
        click login
      </button>
    </div>
  );
}

export default Chat;
