import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import './../css/registration.css';
import { Link } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const regChangeHandler = (e) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/register", registerInfo, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("response from registering", res);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          console.log("success!");
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section class="register">
      <div class="form-container">
        <div class="image-holder"></div>
        <form onSubmit={register}>
          <h2 class="text-center">
            <strong>Create</strong> an account.
          </h2>
          <div class="mb-3">
            <input
              class="form-control"
              type="text"
              name="text"
              onChange={regChangeHandler}
              placeholder="Username"
            />
            {errors.username ? (
              <p className="text-danger">{errors.username.message}</p>
            ) : (
              ""
            )}
          </div>
          <div class="mb-3">
            <input
              class="form-control"
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
          <div class="mb-3">
            <input
              class="form-control"
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
          <div class="mb-3">
            <input
              class="form-control"
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
          <div class="mb-3">
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" />I agree to the
                license terms.
              </label>
            </div>
          </div>
          <div class="mb-3">
            <button class="btn btn-primary d-block w-100" type="submit">
              Sign Up
            </button>
          </div>
          <Link class="already" to="./login">
            You already have an account? Login here.
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
