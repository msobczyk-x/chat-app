import { Avatar } from "antd";
import React, { useState } from "react";
import axios from "axios";
import MessageBox from "../../components/MessageBox";

export const ChangeAvatar = () => {
  const [whichChosen, setWhichChosen] = useState<string>("");
  const [messageSuccess, setMessageSuccess] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (whichChosen === "") {
      return;
    } else {
      axios
        .put(
          `http://localhost:3000/api/updateUser/${localStorage.getItem(
            "username"
          )}`,
          {
            avatar: whichChosen,
          }
        )
        .then((res) => {
          console.log(res.data.message);
          setMessageSuccess(res.data.message);
        });
    }
    console.log(whichChosen);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className=" rounded flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold pt-10">Change Avatar</h1>
        <form
          className="flex flex-col  items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row py-10 flex-wrap items-center justify-center">
            <Avatar
              src="src/assets/avatar1.png"
              size={150}
              className={`m-2 hover:border-red-500 ${
                whichChosen === "avatar1" ? "border-red-500 border-4" : ""
              }`}
              onClick={() => {
                setWhichChosen("avatar1");
              }}
            />
            <Avatar
              src="src/assets/avatar2.png"
              size={150}
              className={`m-2 hover:border-red-500 ${
                whichChosen === "avatar2" ? "border-red-500 border-4" : ""
              }`}
              onClick={() => {
                setWhichChosen("avatar2");
              }}
            />
            <Avatar
              src="src/assets/avatar3.png"
              size={150}
              className={`m-2 hover:border-red-500 ${
                whichChosen === "avatar3" ? "border-red-500 border-4" : ""
              }`}
              onClick={() => {
                setWhichChosen("avatar3");
              }}
            />
            <Avatar
              src="src/assets/avatar4.png"
              size={150}
              className={`m-2 hover:border-red-500 ${
                whichChosen === "avatar4" ? "border-red-500 border-4" : ""
              }`}
              onClick={() => {
                setWhichChosen("avatar4");
              }}
            />
          </div>
          {messageSuccess && (
            <MessageBox message={messageSuccess} variant="success" />
          )}
          <button
            type="submit"
            className="w-80 h-10 rounded-lg font-bold border-2 bg-white border-slate-300 p-2 mb-5 hover:bg-slate-300"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};
