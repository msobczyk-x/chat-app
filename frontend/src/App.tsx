import React, { useState, useEffect, lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Discover from "./pages/Home/Discover";
import Features from "./pages/Home/Features";
import Safety from "./pages/Home/Safety";
import NotFound from "./pages/Error/NotFound";
import MainOutlet from "./pages/MainOutlet";
import LoginPage from "./pages/Login/LoginPage";
import Register from "./pages/Login/Register";
import FirstSetup from "./pages/FirstSetup/FirstSetup";
const checkUserLoggedIn = () => {
  const token = localStorage.getItem("username");
  if (token) {
    return true;
  }
  return false;
};

const MainChat = lazy(() => import("./pages/Chat/MainChat"));
const checkIfNewUser = () => {
  const token = localStorage.getItem("newUser");
  if (token) {
    return true;
  }
  return false;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    setIsLoggedIn(checkUserLoggedIn);
    setIsNewUser(checkIfNewUser());
  }, [isLoggedIn, isNewUser]);

  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<MainOutlet />}>
          <Route
            index
            element={
              isLoggedIn ? (
                isNewUser ? (
                  <FirstSetup />
                ) : (
                  <MainChat />
                )
              ) : (
                <HomePage />
              )
            }
          />
          <Route path="discover" element={<Discover />} />
          <Route path="features" element={<Features />} />
          <Route path="safety" element={<Safety />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="setup" element={<FirstSetup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
