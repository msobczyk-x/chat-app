import { Avatar } from 'antd';
import {UserOutlined } from '@ant-design/icons';
import React from 'react'

function checkAvatar(avatar:string) {
    switch (avatar) {
        case "avatar1":
            return "src/assets/avatar1.png";
            case "avatar2":
            return "src/assets/avatar2.png";
            case "avatar3":
            return "src/assets/avatar3.png";
            case "avatar4":
            return "src/assets/avatar4.png";
            default:
                return ;
    }
}

export const Avatars = (props:any) => {
    const {src} = props;
  return (<>
    {(src === "avatar") ? <Avatar size="large" icon={<UserOutlined />} /> : <Avatar size="large" src={checkAvatar(src)} /> }
    </>
  )
}
