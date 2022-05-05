import React, { useState } from "react";
import "../assets/css/desktopChat.css";

// Components
import Message from "./Message";
import Conversation from "./Conversation";
import Header from "./AppHeader";
import ChatAndConversationDesktop from "./ChatAndConversationDesktop";

// ---
import SmileyIcon from "../assets/imgs/slightly-smiling-face.png";
import CameraIcon from "../assets/imgs/Camera.svg";
import VoiceIcon from "../assets/imgs/Voice 2.svg";
import SendIcon from "../assets/imgs/Send.svg";
// Story images
import Image1 from "../assets/imgs/ToyFaces_Colored_BG_59.jpg";
import Image2 from "../assets/imgs/ToyFaces_Colored_BG_8.jpg";
import Image3 from "../assets/imgs/ToyFaces_Colored_BG_32.jpg";
import Image4 from "../assets/imgs/ToyFaces_Colored_BG_37.jpg";
import Image5 from "../assets/imgs/ToyFaces_Colored_BG_47.jpg";
import Image6 from "../assets/imgs/ToyFaces_Colored_BG_49.jpg";
import Image7 from "../assets/imgs/ToyFaces_Colored_BG_56.jpg";

const DesktopChat = ({ chat, messages }) => {
  return (
    <div className="container">
      {/* Header */}
      <Header />

      {/* Conversation */}
      <ChatAndConversationDesktop chat={chat} messages={messages} />
      {/* stop here */}
    </div>
  );
};

export default DesktopChat;
