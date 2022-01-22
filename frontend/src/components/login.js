import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { AuthContext } from "../context/auth";

import "../components/login.css"

//===============================================================

const Login = () => {
  const { setIsLoggedIn, isLoggedIn, saveToken } = useContext(AuthContext);
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("");
        saveToken(res.data.token);
        setIsLoggedIn(true);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================

  useEffect(() => {
    if (isLoggedIn) {
      history("/addquestion");
    }
  });

  //===============================================================

  return (
    <>
      <div className="Form">
      <div>
      <img className="logo" src="https://englishplatform.uz/wp-content/uploads/2020/12/cropped-English-Platform-2-1536x422.png"/>
    </div>
      <h3> Please fill your Login information below</h3>
        <form onSubmit={login}>
          <br />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="buttonregister">Login</button>
        </form>

        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
  );
};

export default Login;