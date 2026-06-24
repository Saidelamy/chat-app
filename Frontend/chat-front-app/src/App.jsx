import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import Loader from "./components/Loader.jsx";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore";
function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("authUser: ", authUser);

  if (isCheckingAuth) return <Loader />;

  return (
    <>
      <div className="h-screen relative flex items-center justify-center">
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
