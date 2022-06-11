import React, { useState, useEffect } from "react";
import "../assets/css/chat.css";

import { ChatState } from "../context/ChatProvider";

import socket from "../socket/index";

import useDidMount from "../miscellenous/useMountEffect";

import Header from "../components/AppHeader";

import ChatAndConversation from "../components/ChatAndConversation";

const Chat = () => {
  const { user, loader } = ChatState();

  useDidMount(() => {
    socket.emit("setup", user);
  }, user);

  return (
    <>
      {loader ? (
        <h1>loading .... </h1>
      ) : (
        <div className="chatApp">
          <div className="chat">
            <Header />
            <ChatAndConversation />
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
