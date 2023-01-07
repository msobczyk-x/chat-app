import React, { useEffect, useState } from "react";
import MyChats from "../../components/Chat/MyChats";
import ChatWindow from "../../components/Chat/ChatWindow";
import { SocketContext, sc } from "../../context/socket";
import Spinner from "../../components/Spinner/Spinner";
const MainChat = () => {
  const username = localStorage.getItem("username");
  let newRoom: string;
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    sc.on("connection", () => {
      sc.emit("findMatch");
    });
    sc.on("id", (id) => {
      localStorage.setItem("socketId", id);
    });
    sc.on("connected", () => {
      sc.emit("register username", username);
    });
    sc.on("match", (room) => {
      console.log(room);
      newRoom = room;
      setIsConnected(true);
      const id = localStorage.getItem("socketId");
      sc.emit("join room", newRoom, (response: string) => {
        console.log(response);
      });
      sc.on("user disconnected", () => {
        console.log("user disconected");
      });
    });
    return () => {
      sc.off("connection");
      sc.off("register username");
    };
  }, []);
  return (
    <div>
      <SocketContext.Provider value={sc}>
        {isConnected ? (
          <div className="MainChat w-full flex flex-row justify-between h-[calc(100vh_-_10vh)] p-10 items-center rounded">
            <MyChats />

            <ChatWindow />
          </div>
        ) : (
          <Spinner />
        )}
      </SocketContext.Provider>
    </div>
  );
};

export default MainChat;
