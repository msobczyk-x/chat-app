import React from 'react';
import './MyChats.css';

const MyChats = () => {
    return (
        <div className="MyChats w-4/12 flex flex-col h-full rounded mr-12 backdrop-blur bg-slate-100">
            <div className="title font-sans font-bold text-2xl text-left pl-5 pt-5 mb-5">My chats</div>
            <div className="chat-list flex flex-col justify-start items-center">
                <div className="chat-item flex flex-row justify-between items-center w-full p-2 bg-slate-50">
                    <div className="chat-status pl-5 ">
                    <span className='dot'></span>
                    </div>
                    <div className="chat-name p-3">John Doe</div>
                    <div className="time text-sm">... 5 min ago</div>
                    </div>
                    </div>
        </div>
    )
}

export default MyChats;