import React, { useState } from "react";

const HomePage = () => {
  const [username, setUsername] = useState("");

  const handleClick = () => {
    localStorage.setItem("username", username);
    console.log(username);
    window.location.reload();
  };
  return (
    <div className="HomePage w-full h-screen flex flex-col">
      <div className="header flex flex-row justify-between  mt-5  mx-10 items-center ">
        <div className="logo w-60 font-sans font-bold text-3xl text-left pl-5">
          Chatbea
        </div>
        <div className="menu flex">
          <div className="menu-item text-lg font-bold font-sans  ">Home</div>
          <div className="menu-item text-lg font-bold font-sans  pl-10">
            Discover
          </div>
          <div className="menu-item text-lg font-bold font-sans  pl-10">
            Features
          </div>
          <div className="menu-item text-lg font-bold font-sans  pl-10">
            Safety
          </div>
          <div className="login menu-item  text-lg font-bold font-sans pl-16">
            Log in
          </div>
        </div>
      </div>
      <div className="HomePage-wrapper h-96 flex flex-col justify-center items-center rounded  backdrop-blur">
        <div className="HomePage-title font-sans font-bold text-3xl text-left pl-5">
          Enter your username
        </div>
        <div className="HomePage-form w-3/6 h-10 text-left rounded-full flex flex-row justify-between px-5 py-3">
          <div className="HomePage-wrapper-input flex flex-row justify-between items-center w-full h-10 pt-5">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className=" w-full transition ease-in-out delay-150 focus:-translate-y-1 p-2 rounded-full bg-white border-2 border-slate-300 "
            />
            <button
              onClick={handleClick}
              className="bg-slate-300 rounded-full ml-5 p-2 font-bold px-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150 hover:bg-slate-600"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
