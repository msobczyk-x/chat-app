import React, { useEffect, useState } from "react";
import MyChats from "../../components/Chat/MyChats";
import ChatWindow from "../../components/Chat/ChatWindow";
import { SocketContext, sc } from "../../context/socket";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import { useForceUpdate } from "@chakra-ui/react";
const MainChat = () => {
  


  return (
    <div>
      <SocketContext.Provider value={sc}>
       
          <div className="MainChat w-full flex flex-col justify-between h-[calc(100vh_-_8rem)] py-5 items-center rounded md:flex-row">
            <MyChats />
            <ChatWindow />
          </div>
       
      </SocketContext.Provider>
    </div>
  );
};

export default MainChat;
