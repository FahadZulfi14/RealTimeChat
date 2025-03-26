import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages } from '../redux/messageSlice.jsx';



const useGetRealTimeMsg = () => {
    const {socket} = useSelector(store=>store.socket);
    
    const {messages} = useSelector(store => store.message);
    const dispatch = useDispatch();
    useEffect(()=>{
        socket?.on("newMsg", (newMsg)=>{
            dispatch(setMessages([...messages, newMsg]));
            // dispatch(setMessages(prevMessages => [...prevMessages, newMsg]));
            console.log("newMsg====", newMsg);
            
            
        });
       
        return () => socket?.off('newMsg');
        
       
    },[setMessages, messages]);
};
export default useGetRealTimeMsg;