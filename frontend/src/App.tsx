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

const checkUserLoggedIn = () => {
  const token = localStorage.getItem("username");
  if (token) {
    return true;
  }
  return false;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkUserLoggedIn());
  const [username, setUsername] = useState("");

  useEffect(() => {
    
  }
  )

  return (
    <div className="App w-auto h-screen overflow-auto  ">
      <div className="chat-app w-auto ">
      <Routes>
          <Route path="/" element={<MainOutlet/>} > 
          {isLoggedIn ? <Route index element={<MainChat/>} /> : <Route index element={<HomePage/>} />}
          <Route path="discover" element={<Discover/>} />
          <Route path="features" element={<Features/>} />
          <Route path="safety" element={<Safety/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="*" element={<NotFound/>} />
          </Route>
          </Routes>
      </div>
    </div>
  );
}

export default App;
