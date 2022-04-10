import React from "react";
import "../assets/css/conversation.css";

const Conversation = ({ image, username, message, time }) => {
  return (
    <div className="conversation">
      <div className="conversation__box">
        <div className="conversation__image">
          <img src={image} alt="user image" />
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
