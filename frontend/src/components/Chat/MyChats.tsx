import React, { useEffect, useState } from "react";
import "./MyChats.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { sc } from "../../context/socket";
import { key } from "localforage";


const MyChats = (props: any) => {
  const [activeList, setActiveList] = useState([]);
  const [userPairs, setUserPairs] = useState([]);
  const [filteredActiveList, setFilteredActiveList] = useState([]);
    const [filteredOfflineList, setFilteredOfflineList] = useState([]);



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

  function filterOfflinePairs (list:any, activeList:any) {
    return list.filter((item:any) => !activeList.includes(item));
    }

  function filterUserPairs (list:any, activeList:any) {
    return list.filter((item:any) => activeList.includes(item));
  }

function filterList (list: any) {
    return list.filter((item:any) => list.includes(item));


}
  useEffect(() => {
    sc.on("users_status", (response) => {
    setActiveList(filterList(response));
    setFilteredActiveList(filterUserPairs(userPairs, activeList));
    setFilteredOfflineList(filterOfflinePairs(userPairs, activeList));
      fetchData();
      
    });
  }, [activeList]);


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
        {filteredActiveList.map((item: any, index) => (

        <button className={`chat-item flex flex-row justify-between items-center w-full p-2 bg-slate-50`} key={index}>
          <div className="chat-status pl-5 ">
            <span className="dot-online"></span>
          </div>
          <div className="chat-name p-3">{item}</div>
          <div className="time text-sm">Online</div>
        </button>
        ))}

{filteredOfflineList.map((item: any, index) => (

<button className="chat-item flex flex-row justify-between items-center w-full p-2 bg-slate-100" key={index} disabled>
  <div className="chat-status pl-5 ">
    <span className="dot"></span>
  </div>
  <div className="chat-name p-3">{item}</div>
  <div className="time text-sm">...5 min ago</div>
</button>
))}


      </motion.div>
    </div>
  );
};

export default MyChats;
