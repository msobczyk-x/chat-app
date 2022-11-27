import React, { useState } from "react";
import {Link} from "react-router-dom" 
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page w-full h-full flex flex-col justify-center items-center">
    <div className="bg-slate-100 backdrop-blur-3xl w-96 flex flex-col justify-center items-center rounded-lg h-96 m-48">
      <div className="text-3xl font-bold ">Login</div>
      <form className="flex flex-col justify-center items-center p-5"
        onSubmit={(e) => {
          e.preventDefault();
            console.log(`email: ${email}, password: ${password}`);
        }}
      >
        <label className="text-left w-full">Email</label>
        <input
        className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-left w-full">Password</label>
        <input
        className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
        className="w-80 font-bold h-10 rounded-lg bg-slate-300 p-2 mb-5 hover:bg-slate-600 transition ease-in-out delay-150"
        type="submit">Login</button>
        <Link to="/register"
        className=" text-center w-80 font-bold h-10 rounded-lg bg-slate-300 p-2 mb-5 hover:bg-slate-600 transition ease-in-out delay-150"
        type="button">Not yet signed up ? Sign up</Link>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
