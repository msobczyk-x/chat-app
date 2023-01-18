import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  LikeOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { Outlet, Routes, Route, NavLink } from "react-router-dom";
import { ChangeAvatar } from "./ChangeAvatar";
import { ChangeEmail } from "./ChangeEmail";
import { ChangePassword } from "./ChangePassword";
import { ChangeHobby } from "./ChangeHobby";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [currentPage, setCurrentPage] = useState("profile");

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      transition={{ duration: 0.5 }}
      className="flex h-[calc(100vh-6.5rem)] gap-2 w-full flex-col md:flex-row"
    >
      <div className="w-full h-full bg-slate-200 rounded my-2 ml-2 flex flex-col md:w-1/6">
        <div className="flex flex-row items-center p-5 border-b-2 border-slate-300 bg-slate-100">
          <Avatar size="large" icon={<UserOutlined />} />
          <p className="text-lg font-bold font-sans pl-4 pt-1">
            {" "}
            Hi, {username}
          </p>
        </div>

        <button
          className="flex flex-row items-center p-5 border-b-2 border-slate-300 bg-slate-200 hover:bg-slate-100 transition ease-in-out delay-150"
          onClick={() => setCurrentPage("avatar")}
        >
          <PictureOutlined style={{ fontSize: "2rem" }} className="pl-1" />
          <p className="text-md font-bold font-sans pl-4 pt-1">
            {" "}
            Change avatar
          </p>
        </button>

        <button
          className="flex flex-row items-center p-5 border-b-2 border-slate-300 bg-slate-200 hover:bg-slate-100 transition ease-in-out delay-150"
          onClick={() => setCurrentPage("email")}
        >
          <MailOutlined style={{ fontSize: "2rem" }} className="pl-1" />
          <p className="text-md font-bold font-sans pl-4 pt-1"> Change email</p>
        </button>

        <button
          className="flex flex-row items-center p-5 border-b-2 border-slate-300 bg-slate-200 hover:bg-slate-100 transition ease-in-out delay-150"
          onClick={() => setCurrentPage("password")}
        >
          <LockOutlined style={{ fontSize: "2rem" }} className="pl-1" />
          <p className="text-md font-bold font-sans pl-4 pt-1">
            {" "}
            Change password
          </p>
        </button>

        <button
          className="flex flex-row items-center p-5 border-b-2 border-slate-300 bg-slate-200 hover:bg-slate-100 transition ease-in-out delay-150 "
          onClick={() => setCurrentPage("hobby")}
        >
          <LikeOutlined style={{ fontSize: "2rem" }} className="pl-1" />
          <p className="text-md font-bold font-sans pl-4 pt-1"> Change hobby</p>
        </button>
      </div>
      <div className="w-full h-full bg-slate-100 rounded my-2 mr-2 md:w-5/6">
        {
          {
            avatar: <ChangeAvatar />,
            email: <ChangeEmail />,
            password: <ChangePassword />,
            hobby: <ChangeHobby />,
          }[currentPage]
        }
      </div>
    </motion.div>
  );
};

export default ProfilePage;
