import React, {useEffect, useState} from "react"
import Header from "../header/Header"
import MainChat from "./MainChat"
import { io } from "socket.io-client";
import {SocketContext, sc} from "../../utils/socket";


const Main = () => {
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
<div className="">
        <SocketContext.Provider value={sc}>
        <Header/>
        {isConnected ? <MainChat /> : <div className="w-full h-full text-extrabold text-3xl text-center">Connecting...</div>}
        </SocketContext.Provider>
        </div>
)
}
export default Main