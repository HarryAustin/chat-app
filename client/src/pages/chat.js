import React, { useState } from "react";
import "../assets/css/chat.css";
import StoryImage from "../components/Story";
import Conversation from "../components/Conversation";
import Menu from "../components/Menu";
import Message from "../components/Message";

// Assets imgs
import UserPic from "../assets/imgs/ToyFaces_Colored_BG_29.jpg";
import HiPic from "../assets/imgs/waving-hand.png";
import SearchIcon from "../assets/imgs/Search.svg";
import CategoryIcon from "../assets/imgs/Category.svg";
import HomeIcon from "../assets/imgs/Home.svg";
import AddIcon from "../assets/imgs/Plus.svg";
import ExploreIcon from "../assets/imgs/Activity.svg";
import LoveIcon from "../assets/imgs/Heart.svg";
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

const Chat = () => {
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
    <div className="chatApp">
      <div className="chat">
        <header className="chat__header">
          <div className="header__left">
            <div className="header__profilePic">
              <img src={UserPic} alt="user_pic" />
            </div>
            <div className="header__welcomeText">
              <div className="hi">
                <h1>hi</h1>
                <img className="welcome__pic" src={HiPic} alt="hi__pic" />
              </div>
              <h2 className="header__username">James</h2>
            </div>
          </div>
          {/* Desktop */}
          <div className="search__desktop__view desktop">
            <span className="search__span">
              <input
                className="search__input"
                type="search"
                placeholder="search"
              />
              <img src={SearchIcon} alt="search__icon" />
            </span>
          </div>
          {/* end desktop */}
          <div className="header__right">
            <div className="header__search">
              <img src={SearchIcon} alt="search__icon" />
            </div>
            <div className="header__settings">
              <img src={CategoryIcon} alt="categoty__icon" />
            </div>
          </div>
          {/* Desktop view */}
          <div className="header__right__desktop desktop">
            <div className="header__home">
              <img src={HomeIcon} alt="home__icon" />
            </div>
            <div className="header__add">
              <img src={AddIcon} alt="add__icon" />
            </div>
            <div className="header__explore">
              <img src={ExploreIcon} alt="explore__icon" />
            </div>
            <div className="header__love">
              <img src={LoveIcon} alt="love__icon" />
            </div>
          </div>
          {/* End desktop */}
        </header>

        {/* Stories */}
        <section className="stories">
          {storyImgs.map((img) => (
            <StoryImage StoryImg={img.image} StoryName={img.name} />
          ))}
        </section>

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
      </div>
      <section className="App__menu">
        <Menu />
      </section>
    </div>
  );
};

export default Chat;
