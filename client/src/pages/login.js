import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// components
import Notify from "../components/Notify";

// css && assets
import "../assets/css/login.css";
import Hide from "../assets/imgs/Hide.png";
import LoginImg from "../assets/imgs/Login_1.svg";

const Login = () => {
  // history
  const history = useHistory();

  // states
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  const [data, setData] = useState({ username: "", password: "" });

  const [hide, setHide] = useState(true);
  const [notification, setNotification] = useState({
    success: false,
    message: "",
    timeout: 1000, //by default, it takes 1 sec
  });

  // func
  const showHide = () => {
    setHide(!hide);
  };

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const mData = { ...data };
    mData[e.target.name] = e.target.value;
    setData(mData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/v1/login", data);

      if (res.status === 200) {
        setData({ username: "", password: "" });
        // data for client
        const saveInfo = { token: res.data.token, user: res.data.user };
        // save to localstorage
        localStorage.setItem("data", JSON.stringify(saveInfo));

        // notification
        setNotification({
          success: true,
          message: "Login successful!",
          timeout: "1000",
        });

        setErrors({ username: "", password: "" });

        setTimeout(() => {
          history.push("/chat");
        }, 2000);
        // redirect
      }
    } catch (err) {
      setNotification({
        success: true,
        message: "Error login in",
        timeout: "1000",
      });
      setErrors(err.response.data.errors);
      setTimeout(() => {
        setNotification({ success: false, message: "", timeout: 1000 });
      }, 2000);
    }
  };

  return (
    <div className="login">
      {notification.success ? (
        <Notify message={notification.message} timeout={notification.timeout} />
      ) : (
        ""
      )}
      <div className="login__mobile">
        <div className="login__cover">
          <img src={LoginImg} alt="social media about" />
          <div className="text__content">
            <h1 className="title">myXhat</h1>
            <p className="cover__text">Chat and make friends!</p>
          </div>
        </div>
        <div className="login__form">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="login__field">
              <input
                type="text"
                className="login__input"
                id="username"
                name="username"
                placeholder="harrison"
                value={data.username}
                onChange={handleChange}
              />
              <label for="username">
                <h4>username</h4>
              </label>
              <div className="errors">
                <h3>{errors.username}</h3>
              </div>
            </div>
            <div className="login__field">
              <input
                type={hide ? "password" : "text"}
                className="login__input"
                id="password"
                name="password"
                placeholder="5+ characters, 1 Capital letter"
                value={data.password}
                onChange={handleChange}
              />
              <img src={Hide} className="hide" alt="hide" onClick={showHide} />
              <label for="password">
                <h4>password</h4>
              </label>
              <div className="errors">
                <h3>{errors.password}</h3>
              </div>
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
              Please note; to use our app, you agree to our
              <span className="footer__link">terms</span> and
              <span className="footer__link">conditions</span>,
              <span className="footer__link">policy</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
