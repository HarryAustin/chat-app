import React, { useState, useEffect } from "react";
import "../assets/css/chatMessage.css";
import { useParams } from "react-router-dom";
import axios from "axios";

// Components
import Message from "../components/Message";
import DesktopChat from "../components/DesktopChat";

import { ChatState } from "../context/ChatProvider";

import SmileyIcon from "../assets/imgs/slightly-smiling-face.png";
import CameraIcon from "../assets/imgs/Camera.svg";
import VoiceIcon from "../assets/imgs/Voice 2.svg";
import SendIcon from "../assets/imgs/Send.svg";

// Story images
import Image1 from "../assets/imgs/ToyFaces_Colored_BG_59.jpg";

const ChatMessage = () => {
  const { user, messages, setMessages } = ChatState();

  const [chat, setChat] = useState({
    username: "",
    profilePicture: "",
    _id: "",
    _v: 0,
  });

  const [chatLoader, setChatLoader] = useState(true);

  const { chatID } = useParams();

  useEffect(() => {
    const body = {
      chatID,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const fetchChat = async () => {
      try {
        if (user.token.length > 0) {
          const { data } = await axios.post("/chat/v1/single", body, config);
          setMessages(data.chat.messages);
          setChat(data.chat.user);
          setChatLoader(false);
          // send to localstorage for use by other page
          localStorage.setItem("lastChat", chatID);
        } else {
          setChatLoader(true);
        }
      } catch (err) {
        console.log("err", err.response);
      }
    };
    fetchChat();
  }, [user.token, chatID]);
  // fetch data from chat (single chat)

  // msg state
  const [text, setText] = useState("");

  // send message function
  const sendMsg = async () => {
    // send a request to axios
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const body = {
      text,
      chatID,
    };
    try {
      const { data } = await axios.post("/chat/v1/message", body, config);
      setMessages([
        ...messages,
        { text: data.message.text, sender: data.message.sender },
      ]);
      setText("");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      {chatLoader ? (
        <h1>Loading...</h1>
      ) : (
        <div className="chatMessage">
          <div className="mobile chat__app">
            <div className="chat__header">
              <div className="container">
                <div className="chat__header__left">
                  <div className="profile__picture">
                    <img src={Image1} alt="user__image" />
                  </div>
                  <div className="profile__info">
                    <h1>{chat.username}</h1>
                    <h3>Online</h3>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile messages */}
            <div className="messages container">
              {messages.map((message) => (
                <Message
                  text={message.text}
                  time={message.time}
                  sender={message.sender}
                />
              ))}
            </div>

            <section className="message__input">
              <div className="container d-flex">
                <img
                  src={SmileyIcon}
                  className="message__input__emoji"
                  alt="smiley"
                />
                <input
                  type="text"
                  placeholder="Type a Message"
                  name="text"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <div className="message__input__icons">
                  <img src={CameraIcon} alt="Camera" />
                  <img src={VoiceIcon} alt="voice" />
                  <img
                    src={SendIcon}
                    className="send__icon"
                    alt="send"
                    onClick={sendMsg}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="desktop">
            <DesktopChat chat={chat} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
