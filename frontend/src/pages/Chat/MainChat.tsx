import React, { useEffect, useState } from "react";
import MyChats from "../../components/Chat/MyChats";
import ChatWindow from "../../components/Chat/ChatWindow";
import { SocketContext, sc } from "../../context/socket";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import ReactModal from 'react-modal';
import { useForceUpdate } from "@chakra-ui/react";
import Modal from 'react-modal';
  
Modal.setAppElement('#root');
const MainChat = () => {

const [showModal, setShowModal] = useState(false);
const [result, setResult] = useState(false);

  function handleOpenModal(){
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleTrue() {
    setResult(true);
    handleCloseModal();
  }

  function handleFalse() {
    setResult(false);
    handleCloseModal();
  }
  function sendEmit() {
    sc.emit("accept result", username, result)
  }
  const username = localStorage.getItem("username");
  let newRoom: string;
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    sc.on("connection", () => {
      sc.emit("findMatch");
    });
    sc.on("accept pair",() => {
      handleOpenModal();
      
      
    })
    // sc.on("id", (id) => {
    //   localStorage.setItem("socketId", id);
    // });
    sc.on("connected", () => {
      axios.get(`http://localhost:3000/api/getUser/${username}`)
      .then(res=>{
        sc.emit("register username", username, res.data._id, res.data.hobby);
        
      })
      sc.on("username registered",()=>{
        sc.emit("tryToFindMatch");
      }) 
    });

    sc.on("tryAgain",()=>{
      sc.emit("tryToFindMatch");
    });
    // sc.on("tryAgain",()=>{
    //   sc.emit("register username", username);
    // })

    sc.on("match", (room) => {
      console.log(room);
      newRoom = room;
      setIsConnected(true);
      
      sc.emit("join room", newRoom, (response: string) => {
        console.log(response);
      });


      sc.on("user disconnected", () => {
        console.log("user disconnected");
        
      });

    });
    sc.on("end chat", () => {
      console.log("block chat and show button for new connect");
      
    });
    return () => {
      sc.off("match");
      sc.off("join room");
      sc.off("connection");
      sc.off("tryAgain");
      sc.off("findMatch");
      sc.off("tryToFindMatch");
      sc.off("connected");
      sc.off("register username");
    };
  }, []);


  return (
    <div>
      <SocketContext.Provider value={sc}>
        {isConnected ? (
          <div className="MainChat w-full flex flex-col justify-between h-[calc(100vh_-_8rem)] py-5 items-center rounded md:flex-row">
            <MyChats />
            <ChatWindow />
          </div>
        ) : (
          <Spinner />
        )}
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        // onAfterOpen={()=>console.log('Modal opened')}
        onAfterClose={sendEmit}
      >
        <h1>Pop-Out Window</h1>
        <button onClick={handleTrue}>True</button>
        <br></br>
        <button onClick={handleFalse}>False</button>
      </ReactModal>
      </SocketContext.Provider>
    </div>
  );
};

export default MainChat;
