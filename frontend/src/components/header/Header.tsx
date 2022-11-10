import React from "react"
import Profile from "./Profile"
const Header = () => {
return (
<div className="header flex flex-row justify-between  mt-5  mx-10 items-center ">
          <div className="logo w-60 font-sans font-bold text-3xl text-left pl-5">Chatbea</div>
          <Profile />
          
        </div>
)
}

export default Header