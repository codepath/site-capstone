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
import Landing from "./components/Landing/Landing";
import apiClient from "../services/apiClient";
import Slick from "./components/Slick/Slick";
import SchoolsView from "./components/SchoolsView/SchoolsView";

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
  const logoutuser = async () => {
    await apiClient.logoutUser();
    setUser({});
  };

  return (
    <>
      <Navbar logoutuser={logoutuser} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Landing />
            </>
          }
        />
        <Route
          path="/schools"
          element={
            <>
              <SchoolsView />
            </>
          }
        />
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

    // const [count, setCount] = useState(0);
    // return (
    //   <div className="App">
    //     <div>
    //       <a href="https://vitejs.dev" target="_blank">
    //         <img src="/vite.svg" className="logo" alt="Vite logo" />
    //       </a>
    //       <a href="https://reactjs.org" target="_blank">
    //         <img src={reactLogo} className="logo react" alt="React logo" />
    //       </a>
    //     </div>
    //     <h1>Vite + React</h1>
    //     <div className="card">
    //       <button onClick={() => setCount((count) => count + 1)}>
    //         count is {count}
    //       </button>
    //       <p>
    //         Edit <code>src/App.jsx</code> and save to test HMR
    //       </p>
    //     </div>
    //     <p className="read-the-docs">
    //       Click on the Vite and React logos to learn more
    //     </p>
    //   </div>
  );
}

export default App;
