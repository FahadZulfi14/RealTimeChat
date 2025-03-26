import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import {BACKEND_URL} from '../assets/config.jsx'





const SendInput = () => {
const [input, setInput ]= useState("")
const dispatch = useDispatch();
const {selectedUser} = useSelector(store => store.user);
const {messages} = useSelector(store => store.message);



const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post(
            `${BACKEND_URL}/api/message/send/${selectedUser._id}`,
            { message: input },  // Change `input` to `message`
            {
                headers: {
                    'Content-Type': 'application/json'  // Corrected header
                },
                withCredentials: true
            }
        );
        
        dispatch(setMessages([...messages, res?.data?.message]))
        
        
        setInput('')
    } catch (error) {
        console.error("Error sending message:", error.response || error.message);
    }


}

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                
                <input
                    className='w-full border text-sm rounded-lg p-3 border-zinc-500 bg-white text-black block'
                    value={input}
                    type="text"
                    placeholder='send a message...'
                    onChange={(e)=>setInput(e.target.value)}
                    />
                    
                <button type='submit' className='absolute flex items-center inset-y-0 end-0 pr-5'> <SendIcon /> </button>
            </div>
        </form>
)
}

export default SendInput;


