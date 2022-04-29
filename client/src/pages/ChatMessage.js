import React from "react";
import "../assets/css/chatMessage.css";
import { useParams } from "react-router-dom";

// Components
import Message from "../components/Message";
import DesktopChat from "../components/DesktopChat";

import SmileyIcon from "../assets/imgs/slightly-smiling-face.png";
import CameraIcon from "../assets/imgs/Camera.svg";
import VoiceIcon from "../assets/imgs/Voice 2.svg";
import SendIcon from "../assets/imgs/Send.svg";

// Story images
import Image1 from "../assets/imgs/ToyFaces_Colored_BG_59.jpg";

const ChatMessage = () => {
  const { chatID } = useParams();

  // fetch data from chat (single chat)

  return (
    <div className="chatMessage">
      <div className="mobile chat__app">
        <div className="chat__header">
          <div className="container">
            <div className="chat__header__left">
              <div className="profile__picture">
                <img src={Image1} alt="user__image" />
              </div>
              <div className="profile__info">
                <h1>User 1</h1>
                <h3>Online</h3>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile messages */}
        <div className="messages container">
          <Message />
        </div>

        <section className="message__input">
          <div className="container d-flex">
            <img
              src={SmileyIcon}
              className="message__input__emoji"
              alt="smiley"
            />
            <input type="text" placeholder="Type a Message" />
            <div className="message__input__icons">
              <img src={CameraIcon} alt="Camera" />
              <img src={VoiceIcon} alt="voice" />
              <img src={SendIcon} className="send__icon" alt="send" />
            </div>
          </div>
        </section>
      </div>
      <div className="desktop">
        <DesktopChat />
      </div>
    </div>
  );
};

export default ChatMessage;
