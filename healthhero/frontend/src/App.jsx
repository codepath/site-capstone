import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import { AuthContextProvider, useAuthContext } from "../AuthContext/auth";
import Register from "./components/Register/Register";
import Restform from "./components/Restform/Restform";
import apiClient from "../services/apiClient";

function App() {
  const { user, setUser } = useAuthContext();
  useEffect(() => {
    const fetchAuthUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) setUser(data.user);
    };

    const token = localStorage.getItem("token");
    if (token) {
      console.log("token: ", token);
      apiClient.setToken(token);
      fetchAuthUser();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/restaurantForm"
          element={
            <>
              <Restform />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
