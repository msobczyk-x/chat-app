import React from "react";
import './Logo.css';
import { NavLink, useNavigate, redirect } from "react-router-dom";
const Profile = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  return (
    <div className="Profile flex flex-row justify-between w-full ">
      <div className="w-60 font-sans font-bold text-3xl text-left pl-5 ">
        <NavLink to="/" className="logo">
          Vibe
        </NavLink>
      </div>
    <div className="profile-menu flex flex-row justify-center items-center w-60">
      
        <div className="profile-pic pl-4">
        <svg className=" w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        </div>
        <div className="profile-name p-2">{username}</div>
        <div className="logout bg-slate-800 p-2 rounded-lg text-slate-200 text-sm flex ml-10 transition ease-in-out hover:scale-110 delay-150 hover:bg-slate-600" >
          <NavLink to="/" onClick={() => {
          localStorage.clear();
          window.location.reload();
        }} className="flex flex-row"><svg className="w-5 fill-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"/></svg>Logout</NavLink>
        
        
        </div>
    </div>
    </div>
  );
};

export default Profile;
