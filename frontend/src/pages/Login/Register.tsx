import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MessageBox from "../../components/MessageBox";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };

  const checkPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number"
      );
      return;
    }
    if (!checkPassword(password, confirmPassword)) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (day === "" || month === "" || year === "") {
      setErrorMessage("Please enter a valid date of birth");
      return;
    }
    axios.post("http://localhost:3000/api/auth/register", {
            username: username,
            password: password,
            email: email,
            dateOfBirth: `${year}-${month}-${day}`,
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
      };
  return (
    <div className="login-page w-full h-[calc(100vh-4rem)] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
    <div className="backdrop-blur-3xl w-96 flex flex-col justify-center items-center rounded-lg mt-16 p-5 ">
      <div className="text-3xl font-bold ">Sign up</div>
      <form className="flex flex-col justify-center items-center p-5"
        onSubmit={(e) => {
          handleRegister(e);
        }}
      >
        <label className="text-left w-full">Username</label>
        <input
        className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="username"
          value={username}
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-left w-full">Email</label>
        <input
        className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="email"
          value={email}
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-left w-full">Date of birth</label>
        <div className="flex flex-row justify-between w-80">
        <input
        className="w-16 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="text"
          value={day}
          placeholder="DD"
          min={1}
          max={31}
          
          maxLength={2}
          required
          onChange={(e) => setDay(e.target.value)}
        />
        <input
        className="w-16 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="text"
          value={month}
          placeholder="MM"
          min={1}
          max={12}
          maxLength={2}
          required
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
        className="w-24 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="text"
          value={year}
          placeholder="YYYY"
          min={1900}
          max={2023}
          maxLength={4}
          required
          onChange={(e) => setYear(e.target.value)}
        />
        </div>
        <label className="text-left w-full">Password</label>
        <input
        className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="password"
          value={password}
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="text-left w-full">Confirm Password</label>
        <input
        className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
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
