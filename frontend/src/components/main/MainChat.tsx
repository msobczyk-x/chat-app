import React from "react";
import MyChats from "./MyChats";
import ChatWindow from "./ChatWindow";
import { Socket } from "socket.io-client";
import SocketContext from "../../utils/socket-context";
const MainChat = () => {
  return (
    <div className="MainChat w-full flex flex-row justify-between h-[calc(100vh_-_10vh)] p-10 items-center rounded">
      <MyChats />

      <ChatWindow />
    </div>
  );
};

export default MainChat;
