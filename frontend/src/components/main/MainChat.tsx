import React from 'react';
import MyChats from './MyChats';
import ChatWindow from './ChatWindow';
const MainChat = () => {
    return (
        <div className="MainChat w-full flex flex-row justify-between p-10 items-center h-128 rounded">
            <MyChats/>
            <ChatWindow/>
        </div>
    )
}

export default MainChat;