import axios from 'axios'
import React, {useState} from 'react'
import MessageBox from '../../components/MessageBox';

export const ChangeEmail = () => {
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageError, setMessageError] = useState<string>("");
    const username = localStorage.getItem("username");
    const [newEmail, setNewEmail] = useState<string>("")
    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };
      
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(newEmail)) {
            setMessageError("Invalid email");
            return;
        }
        else {
        axios.put(`http://localhost:3000/api/updateUser/${username}`, {
            email: newEmail
        }).then(res => {
            setMessageSuccess(res.data.message)})

    }
}

    
      

  return (
    <div className='w-full h-full flex items-center justify-center text-center'>
        
        <div className='w-1/2 h-1/2 rounded flex flex-col items-center justify-center'>
        <p className='text-3xl font-semibold pb-5'>Change email</p>
        <form className='flex flex-col' onSubmit={handleSubmit}>

                <input type="text" placeholder="New email" className="w-80 h-10 rounded-lg border-2 border-slate-300 p-2 mb-5" value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                ></input>
                {messageSuccess && <MessageBox message={messageSuccess} variant="success"/>}
                {messageError && <MessageBox message={messageError} variant="error"/>}
                <button type="submit" className="w-80 h-10 rounded-lg border-2 bg-white border-slate-300 p-2 mb-5 font-bold">Change email</button>
            </form>
            </div>
    </div>
  )
}
