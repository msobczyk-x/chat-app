import React, { useEffect, useState } from "react";
import "./MyChats.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { sc } from "../../context/socket";

const MyChats = (props: any) => {
  const username = localStorage.getItem("username");
  const [activeList, setActiveList] = useState([] as any);
  const [userPairs, setUserPairs] = useState<string[]>([] as any);
  const [filteredActiveList, setFilteredActiveList] = useState([] as any);
  const [filteredOfflineList, setFilteredOfflineList] = useState([] as any);

  const fetchData = () => {
    axios
      .get(
        `http://localhost:3000/api/getUserPairs/${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        setUserPairs(response.data.data[0].pairs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterList = (list: Array<String>, list2: Array<String>) => {
    return [
      ...new Set(
        list.filter((item) => {
          return list2.includes(item);
        })
      ),
    ];
  };

  const filterOfflineList = (list: Array<String>, list2: Array<String>) => {
    return [
      ...new Set(
        list.filter((item) => {
          return !list2.includes(item);
        })
      ),
    ];
  };

  const filterActiveList = (list: Array<String>, username: string | any) => {
    return list.filter((item) => {
      return item !== username;
    });
  };

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
  useEffect(() => {
    fetchData();
    sc.on("usersStatus", (response) => {
      setActiveList(filterActiveList(response, username));
      if (userPairs.length > 0) {
        setFilteredActiveList(filterList(activeList, userPairs));
        setFilteredOfflineList(filterOfflineList(activeList, userPairs));
      }
      
    });
  }, [activeList]);

  const setChatWith = (username: string) => {
    sc.emit("")
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
          <button key={index}
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

        {filteredOfflineList.map((item: any, index:any) => (
          <button key={index}
            className="chat-item flex flex-row justify-between items-center w-full p-2 bg-slate-100"
            disabled
          >
            <div className="chat-status pl-5 ">
              <span className="dot"></span>
            </div>
            <div className="chat-name p-3 font-semibold">{item}</div>
            <div className="time text-sm">{}</div>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default MyChats;
