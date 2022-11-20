import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [active, setActive] = useState("home");

  const refHome = useRef(null);
  const refDiscover = useRef(null);
  const refFeatures = useRef(null);
  const refSafety = useRef(null);
  const refLogin = useRef(null);

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="logo w-60 font-sans font-bold text-3xl text-left pl-5">
        <Link to="/">Vibe</Link>
      </div>
      <div className="menu flex justify-center items-center">
        <div
          ref={refHome}
          className="menu-item home text-lg font-bold font-sans border-b-2 border-blue-600 active"
        >
          <Link to="/">Home</Link>
        </div>
        <div
          ref={refDiscover}
          className="menu-item discover text-lg font-bold font-sans  pl-10"
        >
          <Link to="/discover">Discover</Link>
        </div>
        <div
          ref={refFeatures}
          className="menu-item features text-lg font-bold font-sans  pl-10"
        >
          <Link to="/features">Features</Link>
        </div>
        <div
          ref={refSafety}
          className="menu-item safety text-lg font-bold font-sans  pl-10"
        >
          <Link to="/safety">Safety</Link>
        </div>
        <div
          ref={refLogin}
          className="login menu-item  text-lg font-bold font-sans pl-16"
        >
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
