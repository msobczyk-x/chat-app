import React, { useState } from "react";
import axios from "axios";
import MessageBox from "../../components/MessageBox";

export const ChangePassword = () => {
  const [messageSuccess, setMessageSuccess] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");
  const username = localStorage.getItem("username");
  const [newPassword, setNewPassword] = useState<string>("");
  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!validatePassword(newPassword)) {
      setMessageError("Invalid password");
      return;
    } else {
      e.preventDefault();
      axios
        .put(`http://localhost:3000/api/updateUser/${username}`, {
          password: newPassword,
        })
        .then((res) => {
          console.log(res.data.message);
          setMessageSuccess("Password changed successfully");
        }).catch((err) => {
          setMessageError(err.response.data.message);
        });;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center text-center">
      <div className="w-1/2 h-1/2 rounded flex flex-col items-center justify-center">
        <p className="text-3xl font-semibold pb-5">Change password</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New password"
            className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          ></input>
          {messageSuccess && <MessageBox message={messageSuccess} variant="success" />}
          {messageError && <MessageBox message={messageError} variant="error" />}
          <button
            type="submit"
            className="w-80 h-10 rounded-lg border-2 bg-white font-bold border-slate-300 p-2 mb-5"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};
