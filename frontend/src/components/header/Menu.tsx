import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Logo.css";
import "./Menu.css";
const Menu = () => {
  return (
    <div className="flex flex-row justify-between w-full">
      <div className="w-60 font-sans font-bold text-3xl text-left pl-5 ">
        <NavLink to="/" className="logo">
          Vibe
        </NavLink>
      </div>
      <div className="menu flex justify-center items-center gap-10">
        <div className="menu-item home text-lg font-bold font-sans">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-red-500" : "null"
            }
          >
            Home
          </NavLink>
        </div>
        <div className="menu-item discover text-lg font-bold font-sans  ">
          <NavLink
            to="/discover"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-red-500" : "null"
            }
          >
            Discover
          </NavLink>
        </div>
        <div className="menu-item features text-lg font-bold font-sans  ">
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-red-500" : "null"
            }
          >
            Features
          </NavLink>
        </div>
        <div className="menu-item safety text-lg font-bold font-sans  ">
          <NavLink
            to="/safety"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-red-500" : "null"
            }
          >
            Safety
          </NavLink>
        </div>
        <div className="login menu-item text-lg font-bold font-sans transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150">
          <NavLink to="/login">Log in</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
