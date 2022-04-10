import React from "react";

// css
import "../assets/css/login.css";

import LoginImg from "../assets/imgs/Login_1.svg";

const Login = () => {
  return (
    <div className="login">
      <div className="login__mobile">
        <div className="login__cover">
          <img src={LoginImg} alt="social media about" />
          <div className="text__content">
            <h1 className="title">myXhat</h1>
            <p className="cover__text">Chat and make friends!</p>
          </div>
        </div>
        <div class="login__form">
          <h1>Login</h1>
          <form>
            <div className="login__field">
              <input
                type="text"
                className="login__input"
                id="username"
                name="username"
                placeholder="harrison"
              />
              <label for="username">
                <h4>username</h4>
              </label>
            </div>
            <div className="login__field">
              <input
                type="password"
                className="login__input"
                id="password"
                name="password"
                placeholder="5+ characters, 1 Capital letter"
              />
              <label for="password">
                <h4>password</h4>
              </label>
            </div>

            <div className="login__field button__field">
              <div className="submit__form">
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
          <div className="login__footer">
            <h2>
              New to myXhat? Click here to{" "}
              <span className="footer__link">Register</span>
            </h2>
            <h2>
              Please note; to use our app, you agree to our{" "}
              <span className="footer__link">terms</span> and{" "}
              <span className="footer__link">conditions</span>,{" "}
              <span className="footer__link">policy</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
