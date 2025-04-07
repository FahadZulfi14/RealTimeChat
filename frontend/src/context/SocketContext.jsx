import {createContext, useState} from 'react';

export const SocketContext = createContext(null);

export const SocketPorvider = (props)=>{
    const [socket, setSocket] = useState(null);
    return (
        <SocketContext.Provider value={{socket, setSocket}}>
            {props.children}
        </SocketContext.Provider>
    )}

