import React from "react";
import "../assets/css/menu.css";

// Assets
import Chat from "../assets/imgs/Chat.svg";
import Status from "../assets/imgs/More Circle.svg";
import Setting from "../assets/imgs/Setting.svg";

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu__box">
        <div className="menu__chat">
          <img src={Chat} alt="chat" />
        </div>
        <div className="menu__status">
          <img src={Status} alt="status" />
        </div>
        <div className="menu__settings">
          <img src={Setting} alt="setting" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
