import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./../css/login.css";
import logoDark from "./../logoDark.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const loginChangeHandler = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/login", loginInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("LOGGGIN IN RESPONSE", res);
        if (res.data.msg === "success!") {
          history.push("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="login">
      <form method="post">
        <h2 className="visually-hidden">Login Form</h2>
        <div className="logo">
        <img src={logoDark} draggable="false" alt="logo"/>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
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
