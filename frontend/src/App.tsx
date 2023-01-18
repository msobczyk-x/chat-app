import React, { useState, useEffect, lazy } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Discover from "./pages/Home/Discover";
import Features from "./pages/Home/Features";
import Safety from "./pages/Home/Safety";
import NotFound from "./pages/Error/NotFound";
import MainOutlet from "./pages/MainOutlet";
import LoginPage from "./pages/Login/LoginPage";
import Register from "./pages/Login/Register";
import FirstSetup from "./pages/FirstSetup/FirstSetup";
import ProfilePage from "./pages/Profile/ProfilePage";
import axios from "axios";

function checkUserLoggedIn(){
  const token = localStorage.getItem("username");
  if (token) {
    return true;
  }
  return false;
};

const MainChat = lazy(() => import("./pages/Chat/MainChat"));

 function checkIfNewUser( hasHobby:any) {
  if (localStorage.getItem("newUser") === "true" || hasHobby.length === 0) {
    return true;
  }
  else {
return false;
      
    }
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [hasHobby, setHasHobby] = useState(false);
  async function fetchData() {
    const response = await axios.get(`http://localhost:3000/api/getUser/${username}`);
    setHasHobby(response.data.hobby);
    localStorage.setItem("avatar", response.data.avatar);
  }
  useEffect(() => {
    if (isLoggedIn){
      fetchData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(checkUserLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsNewUser(checkIfNewUser(hasHobby));
    }
  }, [isLoggedIn, hasHobby]);
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
          <Route path="setup" element={ isLoggedIn ? <FirstSetup /> : <Navigate to="/" replace/>}  />
          <Route path="profile" element={ isLoggedIn ? <ProfilePage /> : <Navigate to="/" replace/>}  />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      
    </div>
   
  );
}

export default App;
