import React from "react";
import "../assets/css/story.css";

// Images from test

const Story = ({ StoryImg, StoryName }) => {
  return (
    <div className="story">
      <div className="story__image">
        {/* img */}
        <img src={StoryImg} alt="image__Story" />
      </div>
      <div className="story__username">
        <h2>{StoryName}</h2>
      </div>
    </div>
  );
};

export default Story;
