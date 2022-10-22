import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ChatWindow = () => {
  const socket = io("http://localhost:3000");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername("Adison");
    socket.on("connect", () => {
      console.log(username, `You connected with id ${socket.id}`);
      socket.emit("register username", username);
    });
  }, [username, socket]);

  return (
    <div className="ChatWindow w-8/12 h-full rounded backdrop-blur bg-slate-200">
      <div className="title font-sans font-bold text-2xl text-left pl-5 pt-5 ">
        Chat
      </div>
      <div className="chat-window flex flex-col items-center w-full">
        <div className="chat-messages flex flex-col justify-end p-4 h-80 w-full">
          <div className="chat-item-left flex flex-row items-start self-start  bg-blue-300 p-2 rounded-full m-5">
            Hey !!!!!
            </div>
            
            <div className="chat-item-right flex flex-row self-end  bg-slate-300 p-2 rounded-full">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          
        </div>

        <div className="message-input w-11/12 bg-white h-10 text-left rounded-full flex flex-row justify-between px-5 py-3">
          <div className="message-wrapper-input flex flex-row justify-between w-full h-10">
            <div className="message-text text-md">
              <input type="text" placeholder="Aa" className="" />
            </div>
            <div className="message-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="w-5"
              >
                <path d="M115.4 226.6L336 256 115.4 285.4 32 480H96L544 256 96 32H32l83.4 194.6z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
