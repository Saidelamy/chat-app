import { Route, Routes } from "react-router";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <div className="min-h-screen bg-teal-700 relative flex items-center justify-center p-4 overflow-hidden">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
