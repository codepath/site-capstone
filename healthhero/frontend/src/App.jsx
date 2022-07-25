import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Restform from "./components/Restform/Restform";

function App() {
  return (
    <BrowserRouter>
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
      <> </>
    </BrowserRouter>

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
