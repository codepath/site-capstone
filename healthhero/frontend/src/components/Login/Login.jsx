import { useEffect, useState } from "react";
import React from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import "../Login/Login.css"; //check if connected
import Navbar from "../Navbar/Navbar";
// import apiClient from "../../../apiClient"; see if we'll use this/authcontext


export default function Login({ user }) {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // if user is already logged in,
    // redirect them to the home page
    if (user?.email) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleOnInputChange = (ev) => {
    if (ev.target.name === "email") {
      if (ev.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [ev.target.name]: ev.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    try {
      const res = await apiClient.loginUser(form)
      if (res?.data) {
        setUser(res.data.user);
        setIsProcessing(false);
        apiClient.setToken(res?.data?.token);
        console.log(res.data);
        navigate("/activity");
        <Navbar>
          <div>
            <p>logged in</p>
          </div>
        </Navbar>;
        console.log("logged in");
      } else {
        setErrors((e) => ({
          ...e,
          form: "Invalid username/password combination",
        }));
        setIsProcessing(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="Login">
      <div className="card">
        <h2>Login</h2>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <select name="people" id="users">
            <option value="student">Student</option>
            <option value="owner">Restaurant Owner</option>
          </select>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button
            className="btn"
            disabled={isProcessing}
            onClick={handleOnSubmit}
          >
            {isProcessing ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="footer">
          <p>
            Don't have an account? Sign up <Link to="/register">here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
