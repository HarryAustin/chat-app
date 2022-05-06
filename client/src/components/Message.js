import React from "react";
import "../assets/css/message.css";

import { ChatState } from "../context/ChatProvider";

const Message = ({ text, time, sender }) => {
  // user
  const { user } = ChatState();
  return (
    <>
      <div className="message__and__time" >
        <div className={ user.user._id === sender
          ? "message__block sender"
          : "message__block"
          }>
          <div
            className={
              user.user._id === sender ? "message sender__message" : "message"
            }
          >
            <h2 className="message__text">
              {/* Hey Boo!, guess what? i just bought a benz!!!!... Cant wait to come
            tonight and rock our world, :wink lol. */}
              {text}
            </h2>
          </div>
          <h3
            className={
              user.user._id === sender
                ? "message__time sender__time"
                : "message__time"
            }
          >
            10:31pm
          </h3>
        </div>
      </div>
    </>
  );
};

export default Message;
