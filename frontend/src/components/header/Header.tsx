import React, { useEffect } from "react";
import Profile from "./Profile";
import Menu from "./Menu";


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
    }
  }),[];

  return (
    <div className="header flex mt-4 mx-4 ">
      {isLoggedIn ? <Profile /> : <Menu />}
    </div>
  );
};

export default Header;
