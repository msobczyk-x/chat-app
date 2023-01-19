import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import { SocketContext, sc } from "../../context/socket";
import { faL } from "@fortawesome/free-solid-svg-icons";
import TextTransition, { presets } from "react-text-transition";
import { Modal } from "antd";
import { Progress } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import HobbyButton from "./HobbyButton";
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
  const [waitingForAccept, setWaitingForAccept] = useState(false);
  const [sharedHobbies, setSharedHobbies] = useState<any>([] as any);
  const [strangerUsername, setStrangerUsername] = useState("");
  const [status, setStatus] = useState("Connected");


  function sendEmit(result: boolean) {
    sc.emit("accept result", username, result);
    setWaitingForAccept(true);
  }

  const userInConvoModala = () => {
    let secondsToGo = 1;
    const modal = Modal.info({
      centered: true,
      icon: <LikeOutlined />,
      title: "User is already in a conversation",
      footer: null,
      onCancel() {
        setUserInConvoModal(false);
      },
      afterClose() {
        setUserInConvoModal(false);
      }
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
     
    }, 1000);
  
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
      
    }, secondsToGo * 1000);
  };


  const countDown = (strangerUsername: string) => {
    let secondsToGo = 5;
  


    const modal = Modal.info({
      centered: true,
      icon: <LikeOutlined />,
      title: `${strangerUsername} wants to talk to you !`,
      content: (
        <div>
          <p>You have {secondsToGo} seconds left to accept.</p>
        </div>
  
      ),
      
      cancelText: "Cancel",
      okText: "Accept",
      okType: "default",
      onCancel() {
        sc.emit("not accept conversation", username);
      },
      onOk() {
        sc.emit("accepted conversation", username);
      },
      afterClose() {
        sc.emit("not accept conversation", username);
      },
        


    });
  
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `You have ${secondsToGo} seconds left to accept.`,
      });
    }, 1000);
  
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
      
    }, secondsToGo * 1000);
  };


  const [userInConvoModal, setUserInConvoModal] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  let newRoom: string;
  const [isConnected, setIsConnected] = useState(false);
  const [result, setResult] = useState(false);
  const [socketID, setSocketID] = useState<any>(
    localStorage.getItem("socketId")
  );

  useEffect(() => {
    setSocketID(localStorage.getItem("socketId"));
    if (socketID) {
      setStatus("Connected");
    }
  }, []);

  useEffect(() => {
    sc.on("connection", () => {
      sc.emit("findMatch");
    });
    sc.on("accept pair", () => {
      console.log("accept pair");
      setStatus("AcceptionStatus");
      setWaitingForAccept(false);
    });

    sc.on("user in conversation", () => {
      console.log("user in conversation");
      userInConvoModala();
      });

    sc.on("accept conversation", (strangerUsername, senderUsername) => {

      countDown(strangerUsername);
    });
    // sc.on("id", (id) => {
    //   localStorage.setItem("socketId", id);
    // });

    // sc.on("tryAgain",()=>{
    //   sc.emit("register username", username);
    // })
    if (status === "LookingForPair") {
      sc.on("tryAgain", () => {
        sc.emit("tryToFindMatch");
      });
    }

    const filterHobbies = (hobbies: string[], hobbies2: string[]) => {
      return [
        ...new Array(
          hobbies.filter((item) => {
            return hobbies2.includes(item);
          })
        ).slice(0, 3),
      ];
    };

    sc.on("match", (room, userHobby, strangerHobby) => {
      console.log(room);
      newRoom = room;
      setIsConnected(true);
      setStatus("Matched");
      setSharedHobbies(filterHobbies(userHobby, strangerHobby));

      sc.emit("join room", newRoom, (response: string) => {
        console.log(response);
        console.log(status);
        setStatus("Matched");
      });
    });

    sc.on("user disconnected", () => {
      console.log("user disconnected");
      setStatus("Disconnected");
      setUserMessages([]);
    });
    sc.on("end chat", () => {
      console.log("block chat and show button for new connect");
      setStatus("Disconnected");
    });
    sc.on("left room", (message) => {
      console.log(message);
    });
    sc.on("bothAccepted", () => {
      setStatus("Matched");
      console.log("both accepted");
    });
    return () => {
      sc.off("connection");
      sc.off("left room");
      sc.off("end chat");
      sc.off("accept pair");
      sc.off("user disconnected");
      sc.off("match");
      sc.off("tryAgain");
      sc.off("connected");
      sc.off("username registered");
      sc.off("bothAccepted");
      sc.off("accept conversation");
      sc.off("user in conversation");
    };
  }, []);

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
      messageEl.current.addEventListener("DOMNodeInserted", (event: Event) => {
        const target = event.currentTarget as HTMLDivElement;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
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
  const [index, setIndex] = useState(0);
  const TEXTS = [
    "💖",
    "🥰",
    "😍",
    "👪",
    "👫",
    "👬",
    "📚",
    "📖",
    "💪",
    "👊",
    "🤝",
  ];

  const TEXTSDISCONNECT = ["💁‍♀️", "🏃‍♂️", "💁", "🏃", "💁‍♂️", "🏃"];
  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div
      className="ChatWindow w-full h-full rounded backdrop-blur bg-slate-200 flex items-center justify-center"
      id="ChatWindow"
    >
   
      
      {
        {
          Connected: (
            <>
              <div className="text-[3rem] font-semibold text-center w-full h-full flex flex-col items-center justify-center ">
                <div className="flex flex-row pb-2">
                  <p className="py-4 px-4">Hi, </p>
                  <p className="py-4 px-6 bg-blue-200 rounded-full shadow-sm backdrop-blur">
                    {username}
                  </p>
                </div>

                <p className="text-[2.5rem] mb-10">Let's begin !</p>
                <button
                  className="transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-blue-300 hover:text-black delay-150 bg-red-500 text-white p-4 rounded-full text-[2rem]"
                  onClick={() => {
                    sc.emit("tryToFindMatch");
                    setStatus("LookingForPair");
                  }}
                >
                  Look for pair 👀
                </button>
              </div>
            </>
          ),
          Matched: (
            <div className="w-full h-full">
              <div className="title font-sans font-bold text-md text-left pl-5 pt-5 justify-between flex flex-col items-center sm:flex-row ">
                <p className="text-2xl md:pb-0 self-start ">Chat</p>
                <div className="flex flex-row items-center justify-center ">
                  <div className=" text-md font-semibold">Shared hobbies:</div>
                  
                  {sharedHobbies.length > 0 && sharedHobbies[0].map((hobby: any, index: any) => (
                  <div key={index}
                  className={`px-2 py-1 rounded-full border-2 mx-2 border-red-400 font-semibold text-sm
      bg-red-400 text-white`}
                >
                  {hobby}
                </div>)
                  )}
                  </div>
                </div>
             
              <div className="chat-window flex flex-col items-center w-full h-full">
                <div
                  ref={messageEl}
                  className="chat-messages flex flex-col w-full h-full overflow-y-auto my-5"
                >
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
          ),
          LookingForPair: (
            <div className="w-full h-full items-center justify-center text-bold flex flex-row flex-wrap backdrop-blur-lg p-0 m-0">
              <p className="text-[2.5rem] text-black font-black">
                Searching for your new
              </p>
              <TextTransition
                inline
                className="text-[5rem]"
                springConfig={presets.wobbly}
              >
                {TEXTS[index % TEXTS.length]}
              </TextTransition>
            </div>
          ),
          Disconnected: (
            <div className="w-full h-full items-center justify-center font-bold flex flex-col flex-wrap backdrop-blur-lg p-0 m-0 text-[3rem]">
              <div className="">
                <div className="w-full h-full items-center justify-center text-bold flex flex-row flex-wrap backdrop-blur-lg">
                  <p className="text-[2.5rem] text-black font-black pr-6">
                    Stranger left the chat
                  </p>
                  <TextTransition
                    inline
                    className="text-[4rem]"
                    springConfig={presets.wobbly}
                  >
                    {TEXTSDISCONNECT[index % TEXTSDISCONNECT.length]}
                  </TextTransition>
                </div>
              </div>
              <button
                className="bg-red-500 rounded-full p-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150 hover:bg-red-300 text-[2rem] text-white shadow backdrop-blur mt-6"
                onClick={() => {
                  sc.emit("tryToFindMatch");
                  setStatus("LookingForPair");
                }}
              >
                Try again
              </button>
            </div>
          ),
          AcceptionStatus: (
            <div className="w-full h-full items-center justify-center font-bold flex flex-col flex-wrap backdrop-blur-lg p-0 m-0">
              {waitingForAccept ? (
                <Spinner className="" text="Waiting for acceptation" />
              ) : (
                <div className="w-full h-full items-center justify-center text-bold flex flex-col flex-wrap backdrop-blur-lg p-0 m-0 text-[3rem]">
                  <h1 className="mb-12 text-center">Do you like him/her ?</h1>
                  <div className="flex flex-row">
                    <button
                      className="bg-green-500 rounded-full p-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150 hover:bg-green-300 text-[2rem] mr-10 text-white shadow backdrop-blur"
                      onClick={() => sendEmit(true)}
                    >
                      Yes 👍
                    </button>
                    <button
                      className="bg-red-500 rounded-full p-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 delay-150 hover:bg-red-300 text-[2rem] text-white shadow backdrop-blur"
                      onClick={() => sendEmit(false)}
                    >
                      No 👎
                    </button>
                  </div>
                </div>
              )}
            </div>
          ),
        }[status]
      }
    </div>
  );
};

export default ChatWindow;
