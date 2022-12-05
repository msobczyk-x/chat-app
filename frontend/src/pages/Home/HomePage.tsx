import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./HomePage.css";
import "../../components/Header/Logo.css";
import "../../components/Header/Menu.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
const HomePage = () => {
  const [username, setUsername] = useState("");

  const handleClick = () => {
    localStorage.setItem("username", username);
    console.log(username);
    window.location.reload();
  };
  return (
    <>
    <div className="HomePage w-full flex flex-col h-screen backdrop-blur items-center space-between gap-96">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="HomePage-wrapper flex flex-col items-center rounded mt-64 ">
          <h1 className="HomePage-title text-[3rem] font-bold">
            Find people with your
            <span className="logo text-[3.5rem] pl-5">Vibe</span>
          </h1>
          <div className="register text-2xl mt-5 font-semibold transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150">
            <NavLink to="/register">Create account</NavLink>
          </div>
        </div>
      </motion.div>
      <div className="w-6 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
      </div>
      
    </div>
    <div className="h-screen bg-red-500"></div>
    </>
  );
};

export default HomePage;
