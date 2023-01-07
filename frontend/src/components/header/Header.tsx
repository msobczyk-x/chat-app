import React, { useEffect } from "react";
import Profile from "./Profile";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
    }
  }),[];

  return (
    <div className="header flex mt-10 mx-10 ">
      {isLoggedIn ? <Profile /> : <Menu />}
    </div>
  );
};

export default Header;
