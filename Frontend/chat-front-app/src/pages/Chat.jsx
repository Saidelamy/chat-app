import { useAuthStore } from "../store/useAuthStore";

function Chat() {
  const { logout } = useAuthStore();

  return (
    <div>
      <button className="btn" onClick={logout}>
        click logout
      </button>
    </div>
  );
}

export default Chat;
