import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import "./Logo.css";
import "./Menu.css";
import { Avatars } from "./Avatars";

const ProfileHamburger = () => {
  

  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
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
                <li className="flex items-center">
                <Avatars src={avatar}/>
                <p className="text-lg font-bold font-sans ml-2">{username}</p>


                </li>
                <li className="menu-item safety text-lg font-bold font-sans  ">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-red-500" : "null"
                    }
                    onClick={
                      () => {
                        window.location.reload();

                    }
                  }
                  >
                    Chat
                  </NavLink>
                </li>
                <li className="menu-item safety text-lg font-bold font-sans  ">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? "border-b-2 border-red-500" : "null"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="login menu-item text-lg text-center font-bold font-sans transition ease-in-out hover:-translate-y-1 hover:scale-105 delay-150 bg-slate-800">
                <NavLink to="/" onClick={handleLogout} className="flex flex-row"><svg className="w-5 fill-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"/></svg>Logout</NavLink>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ProfileHamburger;
