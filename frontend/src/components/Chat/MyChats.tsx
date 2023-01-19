import React, { useEffect, useState } from "react";
import "./MyChats.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { sc } from "../../context/socket";

const MyChats = (props: any) => {
  const username = localStorage.getItem("username");
  const [activeList, setActiveList] = useState([] as any);

  const [filteredActiveList, setFilteredActiveList] = useState([] as any);
  const [filteredOfflineList, setFilteredOfflineList] = useState([] as any);


  

  const calculateTime = (time: any) => {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  };

  const filterActivePairs = (pairs: any) => {

    return pairs.filter(function(obj:any) {
      var key = Object.keys(obj)[0];
      return obj[key] === "online";
    }).map(function(obj:any){
      return Object.keys(obj)[0];
    });

    
  }
  const filterOfflinePairs = (pairs: any) => {
    return pairs.filter(function(obj:any) {
      var key = Object.keys(obj)[0];
      return obj[key] !== "online";
    });
  }



  useEffect(() => {

    sc.on("usersStatus", (response) => {
      setFilteredActiveList(filterActivePairs(response));
      setFilteredOfflineList(filterOfflinePairs(response));
    });
    return () => {
      sc.off("usersStatus");
    }

  }, [activeList]);

  const setChatWith = (username: string) => {
    sc.emit("get pair", username);
  }
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={`MyChats w-full flex flex-col rounded backdrop-blur bg-slate-100 md:w-1/2 md:h-full `}
    >
      <div className="title font-sans font-bold text-2xl text-left px-5 pt-5 mb-5 flex flex-row justify-between">
        <p>My chats</p>
        {isExpanded ? (
          <UpOutlined
            className="pt-2 md:hidden"
            onClick={() => setIsExpanded(!isExpanded)}
          />
        ) : (
          <DownOutlined
            className="pt-2 md:hidden"
            onClick={() => setIsExpanded(!isExpanded)}
          />
        )}
      </div>
      <motion.div
        animate={isExpanded ? "closed" : "open"}
        transition={{ duration: 0.5 }}
        variants={variants}
        className={`chat-list flex flex-col justify-start items-center max-h-128 overflow-y-auto md:max-h-full ${
          isExpanded && "hidden"
        }`}
      >
        {filteredActiveList.map((item: any, index:any) => (
          <button
            key={index}
          onClick={() => setChatWith(item)}
          
            className={`chat-item flex flex-row justify-between items-center w-full p-2 bg-slate-50`}
          >
            <div className="chat-status pl-5 ">
              <span className="dot-online"></span>
            </div>
            <div className="chat-name p-3 font-semibold">{item}</div>
            <div className="time text-sm">Online</div>
          </button>
        ))}

        {filteredOfflineList.map((item: any, key: any) => (
          
            <button key={key}
            className="chat-item flex flex-row justify-between items-center w-full p-2 bg-slate-100"
            disabled
          >
            <div className="chat-status pl-5 ">
              <span className="dot"></span>
            </div>
            <div className="chat-name p-3 font-semibold">{item.key}</div>
            <div className="time text-sm">{calculateTime(item.value)}</div>
          </button>
          ))
          }
          
 
      </motion.div>
    </div>
  );
};

export default MyChats;
