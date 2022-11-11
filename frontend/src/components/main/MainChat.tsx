import React from "react";
import MyChats from "./MyChats";
import ChatWindow from "./ChatWindow";


const MainChat = () => {
  return (
    <div className="MainChat w-full flex flex-row justify-between h-[calc(100vh_-_10vh)] p-10 items-center rounded">
      <MyChats />

      <ChatWindow/>
    </div>
  );
};

export default MainChat;
