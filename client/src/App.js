import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";

import "./App.css";
// PAGES
import Chat from "./pages/chat";
import ChatMessage from "./pages/ChatMessage";
import SignUp from "./pages/signup";
import Login from "./pages/login";

function App() {
  return (
    <div className="app">
      <Route path="/chat" exact>
        <Chat />
      </Route>
      <Route path="/chat/message/:chatID">
        <ChatMessage />
      </Route>
      <Route path="/auth/login" exact>
        <Login />
      </Route>
      <Route path="/auth/signup" exact>
        <SignUp />
      </Route>
      {/* much better for 404 */}
    </div>
  );
}

export default App;
