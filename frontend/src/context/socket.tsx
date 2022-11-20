import React from 'react';
import { io, Socket  } from 'socket.io-client';

export const sc = io('http://localhost:3000'); 
export const SocketContext = React.createContext<Socket>(sc);


