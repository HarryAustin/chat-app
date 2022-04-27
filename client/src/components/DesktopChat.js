import React, { useState } from "react";
import "../assets/css/desktopChat.css";

// Components
import Message from "./Message";
import Conversation from "./Conversation";
import Header from "./AppHeader";

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

const DesktopChat = () => {
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

  const [conversation, setConversation] = useState([
    { image: Image1, username: "user 1", message: "Xup bro", time: "12:04pm" },
    {
      image: Image2,
      username: "user 2",
      message: "Hi, can you help with something",
      time: "11:24pm",
    },
    {
      image: Image3,
      username: "user 3",
      message: "Bro, how far",
      time: "11:20pm",
    },
    {
      image: Image4,
      username: "user 4",
      message: "Chief i greet",
      time: "11:17pm",
    },
    {
      image: Image5,
      username: "user 5",
      message: "When asuu strike take day end",
      time: "yesterday",
    },
  ]);
  return (
    <div className="container">
      {/* Header */}
      <Header />

      {/* Conversation */}
      <div className="chat__and__conversation desktop__view">
        <div>
          <section className="conversation">
            {conversation.map((c) => (
              <Conversation
                image={c.image}
                username={c.username}
                message={c.message}
                time={c.time}
              />
            ))}
          </section>
        </div>

        <section className="desktop__chat desktop">
          <div className="desktop__chat__header">
            <div className="desktop__chat__left">
              <div className="profile__picture">
                <img src={Image1} alt="user__image" />
              </div>
              <div className="profile__info">
                <h1>User 1</h1>
                <h3>Online</h3>
              </div>
            </div>
          </div>
          {/* Chat Messages*/}
          <div className="messages">
            <Message />
          </div>

          <section className="message__input">
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
          </section>
        </section>
      </div>
      {/* stop here */}
    </div>
  );
};

export default DesktopChat;
