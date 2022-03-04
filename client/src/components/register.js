import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./../css/registration.css";
import { Link } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  if (localStorage.getItem("token") !== null) {
    history.push("/");
  }

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    numTel: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    numTel: 0,
  });

  const regChangeHandler = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
    console.log(registerInfo);
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://172.16.134.111:3000/api/v1/auth/Client/register",
        registerInfo,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("response from registering", res.status);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          console.log("success!");
          localStorage.setItem("token", res.data.token);
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="register">
      <div className="form-container">
        <div className="image-holder"></div>
        <form onSubmit={register}>
          <h2 className="text-center">
            <strong>Create</strong> an account.
          </h2>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={regChangeHandler}
              placeholder="Username"
            />
            {errors.name ? (
              <p className="text-danger">{errors.name.message}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={regChangeHandler}
              placeholder="Email"
            />
            {errors.email ? (
              <p className="text-danger">{errors.email.message}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={regChangeHandler}
              placeholder="Password"
            />
            {errors.password ? (
              <p className="text-danger">{errors.password.message}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password-repeat"
              placeholder="Password (repeat)"
            />
            {errors.confirm ? (
              <p className="text-danger">{errors.confirm.message}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="numTel"
              onChange={regChangeHandler}
              placeholder="Phone"
            />
            {errors.name ? (
              <p className="text-danger">{errors.name.message}</p>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" />I agree to
                the license terms.
              </label>
            </div>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary d-block w-100" type="submit">
              Sign Up
            </button>
          </div>
          <Link className="already" to="./login">
            You already have an account? Login here.
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
