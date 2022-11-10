import React, { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import SocketContext from "../../utils/socket-context";

const ChatWindow = () => {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [strangerMessages, setStrangerMessages] = useState<string[]>([]);
  const [messageValue, setMessageValue] = useState("");

  const createMessage = (message: string, sender: string) => {
    {
      sender === username
        ? setUserMessages([...userMessages, message])
        : setStrangerMessages([...strangerMessages, message]);
    }
  };

  const sendMessage = () => {
    socket?.emit("chat message", messageValue);
  };

  useEffect(() => {
    socket?.on("chat message", (username, message) => {
      createMessage(username, message);
      console.log(`${username}: ${message}`);
    });

    return () => {
      socket?.off("connect");
      socket?.off("chat message");
    };
  }, [userMessages, strangerMessages]);

  return (
    <div className="ChatWindow w-8/12 h-full rounded backdrop-blur bg-slate-200">
      <div className="title font-sans font-bold text-2xl text-left pl-5 pt-5 ">
        Chat
      </div>
      <div className="chat-window flex flex-col items-center w-full h-[calc(100vh_-_27vh)] justify-end">
        <div className="chat-messages flex flex-col justify-end p-4 w-full">
          {userMessages.map((message, index) => {
            return (
              <div
                className="message w-full flex flex-row justify-end"
                key={index}
              >
                <div className="message-content bg-blue-300 rounded-md p-2 mt-2 text-slate-900">
                  {message}
                </div>
              </div>
            );
          })}

          {strangerMessages.map((message, index) => {
            return (
              <div
                className="message w-full flex flex-row justify-start m-2"
                key={index}
              >
                <div className="message-content bg-slate-300 rounded-md p-2  text-slate-900">
                  {message}
                </div>
              </div>
            );
          })}
        </div>

        <div className="message-input w-11/12  h-10 text-left rounded-full flex flex-row justify-between px-5 py-3">
          <div className="message-wrapper-input flex flex-row justify-between items-center w-full h-10">
            <input
              onChange={(e) => {
                setMessageValue(e.target.value);
              }}
              type="text"
              placeholder="Aa"
              className="p-2 rounded-full w-full transition ease-in-out delay-150 focus:-translate-y-1 bg-white border-2 border-slate-300  "
            />

            <button
              onClick={sendMessage}
              className="bg-slate-300 rounded-full ml-5 p-2 transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150 hover:bg-slate-600 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="w-5"
              >
                <path d="M115.4 226.6L336 256 115.4 285.4 32 480H96L544 256 96 32H32l83.4 194.6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
