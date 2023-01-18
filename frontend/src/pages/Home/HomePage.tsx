import React, { useState } from "react";
import "./HomePage.css";
import "../../components/Header/Logo.css";
import "../../components/Header/Menu.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ReviewCards from "../../components/ReviewCards/ReviewCards";

const HomePage = () => {
  const [username, setUsername] = useState("");

  const handleClick = () => {
    localStorage.setItem("username", username);
    console.log(username);
    window.location.reload();
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="HomePage w-full h-[calc(100vh-3.5rem)] backdrop-blur">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="HomePage-wrapper flex flex-col items-center text-center rounded pt-48 ">
              <h1 className="HomePage-title text-[2.5rem] font-bold">
                Find people with your
                <span className="logo text-[3rem] pl-5">Vibe</span>
              </h1>
              <div className="register text-2xl mt-5 font-semibold transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150">
                <NavLink to="/register">Create account</NavLink>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="h-[25vh] bg-white mt-10">
          <div className="flex flex-col items-center justify-center py-5">
            <p className="text-4xl b-bottom-2 font-semibold backdrop-blur">
              Reviews
            </p>
            <ReviewCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
