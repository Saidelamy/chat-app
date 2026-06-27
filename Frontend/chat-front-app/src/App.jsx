import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import Loader from "./components/Loader.jsx";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore";
import { useChatStore } from "./store/useChatStore.js";
function App() {
  const { checkAuth, isCheckingAuth, authUser, socket } = useAuthStore();
  const { subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authUser || !socket) return;
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [socket, authUser]);

  if (isCheckingAuth) return <Loader />;

  return (
    <>
      <div className="h-screen relative flex items-center justify-center overflow-hidden">
        <Routes>
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={authUser ? <Chat /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
