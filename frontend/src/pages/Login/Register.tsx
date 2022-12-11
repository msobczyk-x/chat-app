import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MessageBox from "../../components/MessageBox";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  return (
    <div className="login-page w-full h-screen flex flex-col  items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
    <div className="bg-slate-100 backdrop-blur-3xl w-96 flex flex-col justify-center items-center rounded-lg p-5 mt-48">
      <div className="text-3xl font-bold ">Sign up</div>
      <form className="flex flex-col justify-center items-center p-5"
        onSubmit={(e) => {
          e.preventDefault();
          axios.post("http://localhost:3000/api/auth/register", {
            username: username,
            password: password,
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("newUser", res.data.newUser);
            navigate("/setup");
            
            window.location.reload();
        }).catch((err) => {
            setErrorMessage(err.response.data.message);
        }) 
        }}
      >
        <label className="text-left w-full">Username</label>
        <input
        className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-left w-full">Password</label>
        <input
        className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         {errorMessage && (
              <MessageBox message={errorMessage} variant="error" />
            )}
        <button 
        className="w-80 font-bold h-10 rounded-lg bg-slate-300 p-2 mb-5 hover:bg-slate-600 transition ease-in-out delay-150"
        type="submit">Sign up</button>
        
      </form>
    </div>
    </motion.div>
    </div>
  );
};

export default LoginPage;
