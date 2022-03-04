import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./../css/login.css";
import logoDark from "./../logoDark.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  if (localStorage.getItem("token") !== null) {
    history.push("/");
  }
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const loginChangeHandler = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
    console.log(loginInfo);
  };
  const [ErreurDisplay, setErreurDisplay] = useState("");
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://172.16.134.104:3000/api/v1/auth/Client/login", loginInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("LOGGGIN IN RESPONSE", res);

        localStorage.setItem("token", res.data.token);
        history.push("/");
      })
      .catch(function (error) {
        if (error.response) {
          setErreurDisplay(error.response.data.msg);
        }
      });
  };

  return (
    <section className="login">
      <form onSubmit={login}>
        <h2 className="visually-hidden">Login Form</h2>
        <div className="logo">
          <img src={logoDark} draggable="false" alt="logo" />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={loginChangeHandler}
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={loginChangeHandler}
            placeholder="Password"
          />
        </div>
        {ErreurDisplay}
        <div className="mb-3">
          <button className="btn btn-primary d-block w-100" type="submit">
            Log In
          </button>
        </div>
        <Link className="forgot" to="/register">
          Forgot your email or password?
        </Link>
      </form>
    </section>
  );
};

export default Login;
