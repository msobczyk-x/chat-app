import React, {useEffect, useState} from "react";
import MyChats from "../../components/Chat/MyChats";
import ChatWindow from "../../components/Chat/ChatWindow";
import {SocketContext, sc} from "../../context/socket";
import Header  from "../../components/Header/Header";

const MainChat = () => {


const username = localStorage.getItem("username");

const [isConnected, setIsConnected] = useState(false);
        useEffect(() => {
                sc.on('connect', () => {
                  setIsConnected(true);
                  sc.emit("register username", username);
                  sc.emit("join room", "", (response: string) => {
                    console.log(response);
                  })
                });
           
            
                return () => {
                  sc.off('connect')
                  sc.off("register username");
                  sc.off("join room");
                }
              }, [])
  return (
    <div>
    <SocketContext.Provider value={sc}> 
        {isConnected ? <div className="MainChat w-full flex flex-row justify-between h-[calc(100vh_-_10vh)] p-10 items-center rounded">
      <MyChats />

      <ChatWindow/>
    </div> : <div className="w-full h-full text-extrabold text-3xl text-center">Connecting...</div>}
        </SocketContext.Provider>
      
    </div>
  );
};

export default MainChat;
