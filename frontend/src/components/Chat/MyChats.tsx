import React, {useState} from 'react';
import './MyChats.css';
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import {motion} from 'framer-motion';
const MyChats = (props: any) => {

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
      }
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={`MyChats w-full flex flex-col rounded backdrop-blur bg-slate-100 md:w-1/2 md:h-full `}>
            <div className="title font-sans font-bold text-2xl text-left px-5 pt-5 mb-5 flex flex-row justify-between">
                <p>My chats</p>
                {isExpanded ? <UpOutlined className='pt-2 md:hidden' onClick={() => setIsExpanded(!isExpanded)}/> : <DownOutlined className='pt-2 md:hidden' onClick={() => setIsExpanded(!isExpanded)}/>}
            </div>
            <motion.div 
            
            animate={isExpanded ? 'closed' : 'open'}
            transition={{ duration: 0.5 }}
            variants={variants}
            className={`chat-list flex flex-col justify-start items-center max-h-128 overflow-y-auto md:max-h-full ${isExpanded && 'hidden'}`}>
                <div className="chat-item flex flex-row justify-between items-center w-full p-2 bg-slate-50">
                    <div className="chat-status pl-5 ">
                    <span className='dot'></span>
                    </div>
                    <div className="chat-name p-3">John Doe</div>
                    <div className="time text-sm">... 5 min ago</div>
                    </div>
                    </motion.div>
        </div>
    )
}

export default MyChats;