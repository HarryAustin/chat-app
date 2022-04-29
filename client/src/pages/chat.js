import React, { useState, useEffect } from "react";
import "../assets/css/chat.css";
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

  /**
   * Just like this above, after searching for users, return an array with the data as 
   * [{
   *   id: 1,
   *    name: 'user 1',
   *    ....
   * }
   * ]
   * 
   Then when a user clicks on any of the users, we pick the id and create an Api query like '/chat/create?user={id}
  // since these are the data, i must offcourse call the data in a component or some "html".
  // we can render each in a link with their id to the chat page, then make the request and other logic.
   */

  return (
    <div className="chatApp">
      <div className="chat">
        {/* header here */}
        <Header />

        {/* Stories After header and before chat and*/}
        <section className="stories">
          {storyImgs.map((img) => (
            <StoryImage StoryImg={img.image} StoryName={img.name} />
          ))}
        </section>

        <ChatAndConversation />
        {/* component here */}
      </div>
      <section className="App__menu">
        <Menu />
      </section>
    </div>
  );
};

export default Chat;
