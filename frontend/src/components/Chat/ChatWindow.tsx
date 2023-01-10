import React, { useContext, useEffect, useState, useRef } from "react";

import { SocketContext } from "../../context/socket";

type Message = {
  username: string;
  message: string;
};

const ChatWindow = () => {
  const messageEl = useRef<HTMLDivElement>(null);
  const socket = useContext(SocketContext);
  const username = localStorage.getItem("username");
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [messageValue, setMessageValue] = useState("");

  const createMessage = (message: string, sender: any) => {
    {
      setUserMessages([
        ...userMessages,
        { username: sender, message: message },
      ]);
    }
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (messageValue === "") {
      return;
    }
    socket.emit("chat message", messageValue, username);
    createMessage(messageValue, username);
    setMessageValue("");
  };
  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.addEventListener('DOMNodeInserted', (event: Event) => {
        const target = event.currentTarget as HTMLDivElement;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);
  useEffect(() => {
    socket.on("chat message", (username, message) => {
      createMessage(message, username);
      console.log(`${username}: ${message}`);
    });
    return () => {
      socket.off("chat message");
    };
  }, [userMessages]);

  return (
    <div className="ChatWindow w-full h-full rounded backdrop-blur bg-slate-200">
      <div className="title font-sans font-bold text-2xl text-left pl-5 pt-5 ">
        Chat
      </div>
      <div className="chat-window flex flex-col items-center w-full h-full">
        <div ref={messageEl} className="chat-messages flex flex-col w-full h-full overflow-y-auto my-5">
          {userMessages.map((message, index) => {
            return (
              <div className="" key={index}>
                {message.username === username ? (
                  <div className="message w-full flex flex-row justify-end">
                    <div className="message-content bg-blue-300 rounded-md p-2 my-2 mx-4 text-slate-900">
                      {message.message}
                    </div>
                  </div>
                ) : (
                  <div className="message w-full flex flex-row justify-start">
                    <div className="message-content bg-slate-300 rounded-md p-2 my-2 mx-4 text-slate-900">
                      {message.message}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="message-input w-11/12 text-left rounded-full flex flex-row justify-between px-5 pb-16">
          <form
            onSubmit={sendMessage}
            className="message-wrapper-input flex flex-row justify-between items-center w-full h-10"
          >
            <input
              onChange={(e) => {
                setMessageValue(e.target.value);
              }}
              type="text"
              placeholder="Aa"
              className="p-2 rounded-full w-full transition ease-in-out delay-150  bg-white border-2 border-slate-300  "
              value={messageValue}
            />

            <button
              type="submit"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
