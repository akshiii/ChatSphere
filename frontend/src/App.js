import "./App.css";
import ChatPage from "./components/ChatPage";
import HomePage from "./components/HomePage";
import { SocketProvider } from "./providers/SockerProvider";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:prompt" element={<ChatPage />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;
