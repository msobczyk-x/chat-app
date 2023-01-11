import React, { useCallback } from "react";
import "./FirstSetup.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../../components/MessageBox";
import { hobbies } from "./Hobbies";
const FirstSetup = () => {
  const [interest, setInterest] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const nav = useNavigate();
 const handleChecked = (e: any) => {
    const hobby = e.target.innerText;
    if (interest.includes(hobby)) {
      setInterest(interest.filter((item: any) => item !== hobby));
    } else {
      setInterest([...interest, hobby]);
    }
  };

  const hobbiesList = hobbies.map((hobby: any) => (
    <button
      key={hobby}
      className={`px-2 py-1 rounded-full m-2 border-2 border-red-500 font-bold ${
        interest.includes(hobby) ? "bg-red-500 text-white" : "bg-white"
      }`}
      onClick={handleChecked}
    >
      {hobby}
    </button>
  ));

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: any) => {
    if (interest.length === 0) {
      setErrorMessage("Please select atleast one hobby");
      return;
    }
    else if (interest.length >10) {
      setErrorMessage("Please select atmost 10 hobbies");
      return;
    }
    
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/saveHobby", {
        username: localStorage.getItem("username"),
        hobby: interest,
      })
      .then((res) => {
        localStorage.removeItem("newUser");
        window.location.href = "/";
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
      
  };
  
    
  return (

    <div className="setup-page w-full h-[100vh_-_5rem] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        
        <div className=" backdrop-blur-3xl w-96 flex flex-col justify-center items-center rounded-lg mt-10 p-5 md:w-128">
        {(errorMessage && interest.length==0) && (<MessageBox message={errorMessage} variant="error" />)}
          <div className="text-3xl font-bold ">Tell us your interested into</div>
          <div className="flex flex-col justify-center items-center p-5">
            <div className="flex flex-wrap justify-center items-center">
              {hobbiesList}
            </div>
            
            <button
              className="w-80 font-bold h-10 rounded-lg bg-slate-300 p-2 mt-5 hover:bg-slate-600 transition ease-in-out delay-150"
              type="submit"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>

  

  )
};

export default FirstSetup;
