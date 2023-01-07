import "./FirstSetup.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MessageBox from "../../components/MessageBox";
import { hobbies } from "./Hobbies";
const FirstSetup = () => {
  const [interest, setInterest] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const hobbiesList = hobbies.map((hobby: any) => (
    <button
      key={hobby}
      className={`p-2 rounded m-3 border-2 border-red-500 font-bold ${interest.includes(hobby) ? 'bg-red-500 text-white' : 'bg-white'}`}
     
      onClick={() => setInterest([...interest, hobby])}
    >
      {hobby}
    </button>
  ));

  useEffect(() => {
    console.log(interest);
    }, [interest]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/saveHobby", {
            username: localStorage.getItem("username"),
            hobby: interest
        }).then((res) => {
            console.log(res.data);
            localStorage.removeItem("newUser");
            window.location.href = "/";
        }).catch((err) => {
            setErrorMessage(err.response.data.message);
        })
    }

  return (
    <div className="setup-page w-full h-[100vh_-_5rem] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-slate-100 backdrop-blur-3xl w-128 flex flex-col justify-center items-center rounded-lg mt-10 p-5">
          <div className="text-3xl font-bold ">Tell us your interested in</div>
          <div className="flex flex-col justify-center items-center p-5">
            <div className="flex flex-wrap justify-center items-center">
              {hobbiesList}
            </div>
            {errorMessage && (
              <MessageBox message={errorMessage} variant="error" />
            )}
            <button
              className="w-80 font-bold h-10 rounded-lg bg-slate-300 p-2 mb-5 hover:bg-slate-600 transition ease-in-out delay-150"
              type="submit"
              onClick={handleSubmit}
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FirstSetup;
