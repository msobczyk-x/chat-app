import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./Logo.css";
import "./Menu.css";

const Menu = () => {
  const [navbar, setNavbar] = useState(false);
  return (
    <div className="flex flex-row justify-between w-full">
      <nav className="w-full bg-white">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div className="font-sans font-bold text-3xl text-left lg:pl-5 ">
                <NavLink to="/" className="logo">
                  Vibe
                </NavLink>
              </div>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border pt-3"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <motion.div
            
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}

            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="menu-item safety text-lg font-bold font-sans  ">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-red-500" : "null"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="menu-item safety text-lg font-bold font-sans  ">
                  <NavLink
                    to="/discover"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-red-500" : "null"
                    }
                  >
                    Discover
                  </NavLink>
                </li>
                <li className="menu-item safety text-lg font-bold font-sans  ">
                  <NavLink
                    to="/features"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-red-500" : "null"
                    }
                  >
                    Features
                  </NavLink>
                </li>
                <li className="menu-item safety text-lg font-bold font-sans  ">
                  <NavLink
                    to="/safety"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-red-500" : "null"
                    }
                  >
                    Safety
                  </NavLink>
                </li>
                <li className="login menu-item text-lg text-center font-bold font-sans transition ease-in-out hover:-translate-y-1 hover:scale-105 delay-150">
                  <NavLink to="/login">Log in</NavLink>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
