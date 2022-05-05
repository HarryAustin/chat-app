import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { useHistory } from "react-router-dom";

import axios from "axios";

import "../assets/css/conversation.css";

const Conversation = ({ image, username, message, time, id }) => {
  const history = useHistory();
  const { user } = ChatState();

  const [click, setClick] = useState(false);

  const createChat = async (e) => {
    e.preventDefault();
    // send an Api request to cereate chat
    const body = {
      chatID: id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const { data } = await axios.post("/chat/v1/single", body, config);
      const chat = data.chat.id;
      console.log("res", data);
      history.push(`/chat/message/${chat}`);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="conversation" onClick={createChat}>
      <div className="conversation__box">
        <div className="conversation__image">
          <img src={image} alt="user" />
        </div>
        <div className="conversation__text">
          <h1>{username}</h1>
          <h3>{message}</h3>
        </div>
        <div className="conversation__time">
          <h4>just now</h4>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
