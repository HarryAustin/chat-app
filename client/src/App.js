import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// PAGES
import Chat from "./pages/chat";
import ChatMessage from "./pages/ChatMessage";
import SignUp from "./pages/signup";
import Login from "./pages/login";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/chat/message">
            <ChatMessage />
          </Route>
          <Route path="/auth/login">
            <Login />
          </Route>
          <Route path="/">
            <SignUp />
          </Route>
          {/* much better for 404 */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
