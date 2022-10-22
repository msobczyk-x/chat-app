import React from "react";
import Profile from "./components/header/Profile";
import "./App.css";
import MainChat from "./components/main/MainChat";

function App() {
  return (
    <div className="App w-auto h-fit ">
      <div className="chat-app w-auto h-fit">
        <div className="header flex flex-row justify-between my-8 mx-10 items-center mb-20">
          <div className="logo w-60 font-sans font-bold text-3xl text-left pl-5">Chatbea</div>
          <Profile />
          
        </div>
        <MainChat />
      </div>
    </div>
  );
}

export default App;
