import React, { useState, useEffect } from "react";
import "../assets/css/chat.css";

import { ChatState } from "../context/ChatProvider";
import { useHistory } from "react-router-dom";

import StoryImage from "../components/Story";
import Conversation from "../components/Conversation";
import Menu from "../components/Menu";
import Message from "../components/Message";
import Header from "../components/AppHeader";
// import DesktopChat from "../components/DesktopChat";
import ChatAndConversation from "../components/ChatAndConversation";

// Story images
import Image1 from "../assets/imgs/ToyFaces_Colored_BG_59.jpg";
import Image2 from "../assets/imgs/ToyFaces_Colored_BG_8.jpg";
import Image3 from "../assets/imgs/ToyFaces_Colored_BG_32.jpg";
import Image4 from "../assets/imgs/ToyFaces_Colored_BG_37.jpg";
import Image5 from "../assets/imgs/ToyFaces_Colored_BG_47.jpg";
import Image6 from "../assets/imgs/ToyFaces_Colored_BG_49.jpg";
import Image7 from "../assets/imgs/ToyFaces_Colored_BG_56.jpg";

const Chat = () => {
  const { user, loader } = ChatState();
  // State for images
  const [storyImgs, setStoryImgs] = useState([
    { image: Image1, name: "User 1" },
    { image: Image2, name: "User 2" },
    { image: Image3, name: "User 3" },
    { image: Image4, name: "User 4" },
    { image: Image5, name: "User 5" },
    { image: Image6, name: "User 6" },
    { image: Image7, name: "User 7" },
  ]);

  return (
    <>
      {loader ? (
        <h1>loading .... </h1>
      ) : (
        <div className="chatApp">
          <div className="chat">
            <Header />
            <section className="stories">
              {storyImgs.map((img) => (
                <StoryImage StoryImg={img.image} StoryName={img.name} />
              ))}
            </section>
            <ChatAndConversation />
          </div>
          <section className="App__menu">
            <Menu />
          </section>
        </div>
      )}
    </>
  );
};

export default Chat;
