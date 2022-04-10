import React from "react";
import "./App.css";
// PAGES
import Chat from "./pages/chat";
import ChatMessage from "./pages/ChatMessage";
import SignUp from "./pages/signup";
import Login from "./pages/login";

function App() {
  return (
    <div className="app">
      {/* <Chat /> */}
      <ChatMessage />
      {/* <SignUp /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
