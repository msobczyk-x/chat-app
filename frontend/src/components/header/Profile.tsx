import React, {useState, useEffect} from "react";
import ProfileDropdown from "./ProfileDropdown";
import ProfileHamburger from "./ProfileHamburger";
const Profile = () => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  const username = localStorage.getItem("username");

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);
  return (
    <>
    {matches ? (<ProfileDropdown username={username} />) : (<ProfileHamburger />)}
    </>
  );
};

export default Profile;
