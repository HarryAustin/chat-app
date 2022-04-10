import React from "react";
import "../assets/css/message.css";

const Message = () => {
  return (
    <>
      <div className="message__and__time">
        <div className="message">
          <h2 className="message__text">
            Hey Boo!, guess what? i just bought a benz!!!!... Cant wait to come
            tonight and rock our world, :wink lol.
          </h2>
        </div>
        <h3 className="message__time">10:31pm</h3>
      </div>

      <div className="message__and__time sender">
        <div className="message sender__message">
          <h2 className="message__text sender__text">
            Wow!!!, congrats babe, knew you would get it. can wait!!.
          </h2>
        </div>
        <h3 className="message__time sender__time">10:31pm</h3>
      </div>
      {/* For sender change add the classLists to it. */}
    </>
  );
};

export default Message;
