import React, {useEffect, useState} from "react"
import Header from "../header/Header"
import MainChat from "./MainChat"
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import SocketContext from "../../utils/socket-context";


const socket = io(`http://${window.location.hostname}:3000`);
const Main = () => {
const [isConnected, setIsConnected] = useState(false);
        useEffect(() => {
                socket.on('connect', () => {
                  setIsConnected(true);
                })
            
                return () => {
                  socket.off('connect')
                }
              }, [])
return (
<div className="">
        <SocketContext.Provider value={socket}>
        <Header/>
        {isConnected ? <MainChat/> : <div className="text-extrabold text-xl">Connecting...</div>}
        </SocketContext.Provider>
        </div>
)
}
export default Main