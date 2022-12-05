import React, {useEffect, useState} from "react";
import MyChats from "../../components/Chat/MyChats";
import ChatWindow from "../../components/Chat/ChatWindow";
import {SocketContext, sc} from "../../context/socket";
import Spinner from "../../components/Spinner/Spinner";
const MainChat = () => {


const username = localStorage.getItem("username");

const [isConnected, setIsConnected] = useState(false);
        useEffect(() => {
                sc.on('connection', () => {
                  setIsConnected(true);
                  sc.emit("register username", username);
                  sc.emit("join room", "", (response: string) => {
                    console.log(response);
                  })
                });
           
            
                return () => {
                  sc.off('connection')
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
    </div> : <Spinner/>}
        </SocketContext.Provider>
      
    </div>
  );
};

export default MainChat;
