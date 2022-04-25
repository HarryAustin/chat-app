import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// css && assets
import "../assets/css/signup.css";
import SocialMediaImg from "../assets/imgs/Social Media.svg";
import Hide from "../assets/imgs/Hide.png";
// components
import Notify from "../components/Notify";

const SignUp = () => {
  // initialize history
  const history = useHistory();

  // get user data then submit to backend
  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [hide, setHide] = useState(true);

  // const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState({
    success: false,
    message: "",
    timeout: 1000, //by default, it takes 1 sec
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // func
  const showHide = () => {
    setHide(!hide);
  };

  const handleChange = (e) => {
    const mData = { ...data };
    mData[e.target.name] = e.target.value;
    setData(mData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/v1/register", data);
      if (res.data.success) {
        // setSuccess(true);
        setNotification({
          success: true,
          message: "Registered!",
          timeout: 1000,
        });

        const mErrors = { username: "", password: "", confirmPassword: "" };
        setErrors(mErrors);
        //Reset it back

        //  if sucess, push user to login
        setTimeout(() => {
          history.push("/auth/login");
        }, 2000);
      }
    } catch (err) {
      // update errors
      setErrors(err.response.data.errors);
      // show notifications for error
      setNotification({
        success: true,
        message: "Error login in",
        timeout: "1000",
      });
      // update back for other errors
      setTimeout(() => {
        setNotification({ success: false, message: "", timeout: 1000 });
      }, 2000);
    }
  };

  return (
    <div className="signup">
      {notification.success ? (
        <Notify message={notification.message} timeout={notification.timeout} />
      ) : (
        ""
      )}
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

          <form onSubmit={handleSubmit}>
            <div className="signup__field">
              <input
                type="text"
                className="signup__input"
                id="username"
                name="username"
                placeholder="harrison"
                onChange={handleChange}
              />
              <label for="username">
                <h4>username</h4>
              </label>
              <div className="errors">
                <h3>{errors.username}</h3>
              </div>
            </div>
            <div className="signup__field">
              <input
                type={hide ? "password" : "text"}
                className="signup__input"
                id="password"
                name="password"
                placeholder="5+ characters, 1 Capital letter"
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
            <div className="signup__field">
              <input
                type={hide ? "password" : "text"}
                className="signup__input"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="5+ characters, 1 Capital letter"
                onChange={handleChange}
              />
              <img src={Hide} className="hide" alt="hide" onClick={showHide} />
              <label for="confirmPassword">
                <h4>confirm password</h4>
              </label>
              <div className="errors">
                <h3>{errors.confirmPassword}</h3>
              </div>
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
