import React, {useState, useEffect} from "react";
import "./App.css";
import Header from "./components/Header/Header";
import {Routes, Route, Outlet, Link} from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import MainChat from "./pages/Chat/MainChat"
import Discover from "./pages/Home/Discover"
import Features from "./pages/Home/Features"
import Safety from "./pages/Home/Safety"
import NotFound from "./pages/Error/NotFound"
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
  }, [isLoggedIn, isNewUser]
  )

  return (
    <div className="App ">
      <Routes>
          <Route path="/" element={<MainOutlet/>} >
    
          {isLoggedIn ? (isNewUser ?  <Route index element={<FirstSetup/>} /> : <Route index element={<MainChat/>} />) : <Route index element={<HomePage/>} />}
          <Route path="discover" element={<Discover/>} />
          <Route path="features" element={<Features/>} />
          <Route path="safety" element={<Safety/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="register" element={<Register/>} />
          <Route path="setup" element={<FirstSetup/>} />
          <Route path="*" element={<NotFound/>} />
          </Route>
          </Routes>
    </div>
  );
}

export default App;
