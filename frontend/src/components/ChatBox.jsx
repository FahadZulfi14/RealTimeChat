import React, { useEffect } from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import MessageInput from './MessageInput';
// import { setSelectedUser } from '../redux/userSlice';


const ChatBox = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
  const isOnline = onlineUsers && selectedUser && onlineUsers?.includes(selectedUser?._id)

  
 
  
  const dispatch = useDispatch();


  useEffect(()=>{

    return ()=> dispatch(setSelectedUser(null))
  },[])

  const selectUserBtn = ()=>{
dispatch(setSelectedUser(null))
 }


  return (

    <>
    {
      selectedUser !== null ? (<div className="flex flex-col h-full bg-gray-50 p-0">
        {/* Chat Header */}
        <div className="flex items-center space-x-3 bg-white shadow-md p-3 mb-4">
          <div onClick={()=>selectUserBtn()} className='flex md:hidden cursor-pointer'>
          <i className="fa-solid fa-arrow-left"></i>
          </div> 
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <img
              src={selectedUser?.picture.secure_url}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
            {/* Online Indicator */}
            
          </div>

            <div className="flex flex-col">
              <p className="text-black font-semibold">{selectedUser?.name}</p>
              {isOnline ? <p className="text-sm text-green-500">online</p>
                :
                          <p className="text-sm text-gray-500">{selectedUser?.email}</p>}
            </div>
              


        </div>
  
        {/* Messages Section */}
        <Messages />
  
        {/* Input Section */}
        {/* <SendInput /> */}
        <MessageInput/>
      </div>) : ( <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
        <h1 className='text-slate-600 text-3xl font-bold' >{`Hi ${authUser?.name} Welcome to the chat`}</h1>
        <h1 className='text-slate-500 text-2xl' >Lets start conversation</h1>
    </div>)
    }
    </>


    
  )
};

export default ChatBox;

