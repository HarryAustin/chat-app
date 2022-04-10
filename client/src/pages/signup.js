import React from "react";
// css
import "../assets/css/signup.css";
import SocialMediaImg from "../assets/imgs/Social Media.svg";

const SignUp = () => {
  return (
    <div className="signup">
      <div className="signup__mobile">
        <div className="signup__cover">
          <img src={SocialMediaImg} alt="social media about" />
          <div className="text__content">
            <h1 className="title">Sign Up for chat app</h1>
            <p className="cover__text">Chat with a community that loves you!</p>
          </div>
        </div>
        <div class="signup__form">
          <h1>Register</h1>
          <form>
            <div className="signup__field">
              <input
                type="text"
                className="signup__input"
                id="username"
                name="username"
                placeholder="harrison"
              />
              <label for="username">
                <h4>username</h4>
              </label>
            </div>
            <div className="signup__field">
              <input
                type="password"
                className="signup__input"
                id="password"
                name="password"
                placeholder="5+ characters, 1 Capital letter"
              />
              <label for="password">
                <h4>password</h4>
              </label>
            </div>
            <div className="signup__field">
              <input
                type="password"
                className="signup__input"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="5+ characters, 1 Capital letter"
              />
              <label for="confirmPassword">
                <h4>confirm password</h4>
              </label>
            </div>

            <div className="signup__field profile__field">
              <input
                type="file"
                className="signup__input"
                id="profile_picture"
                name="profilePicture"
              />
              <label for="profile_picture">
                <h4>profile picture</h4>
              </label>
            </div>

            <div className="signup__field button__field">
              <div className="submit__form">
                <button type="submit">Sign up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
