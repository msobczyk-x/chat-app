import React, { useEffect, useState, lazy } from "react";
import MyChats from "../../components/Chat/MyChats";
import { SocketContext, sc } from "../../context/socket";
import Spinner from "../../components/Spinner/Spinner";
import ChatWindow from "../../components/Chat/ChatWindow";
import axios from "axios";
import { motion } from "framer-motion";
  

const MainChat = () => {
const username = localStorage.getItem("username");

useEffect(() => {
  sc.on("connected", () => {
    axios.get(`http://localhost:3000/api/getUser/${username}`).then((res) => {
      sc.emit("register username", username, res.data.hobby);
      localStorage.setItem("socketId", res.data.socketId);
    });
  });
  return () => {
    sc.off("connected");
  }
}, []);
  return (
    <div>
      <SocketContext.Provider value={sc}>

          <motion.div 
   
          className="MainChat w-full flex flex-col justify-between h-[calc(100vh_-_8rem)] py-5 items-center rounded md:flex-row">
            <MyChats />
            <ChatWindow />
          </motion.div>
    
      
      </SocketContext.Provider>
    </div>
  );
};

export default MainChat;
