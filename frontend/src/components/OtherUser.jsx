import React from 'react';  
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedUser} from '../redux/userSlice.jsx';  
import moment from 'moment';



const OtherUser = ({user}) => {
  const picture = user.picture.secure_url;
  const dispatch = useDispatch();
  const {selectedUser, onlineUsers , otherUsers} = useSelector(store => store.user);
  const {messages} = useSelector(store => store.message);
  const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);
  
  const formattedDate = moment(user.updatedAt).format('ll');
  

   // Function to get the last message for a particular user
  //  const getLastMessageDate = (userId) => {
  //   const userMessages = messages && messages?.filter(message => message?.senderId === userId || message?.receiverId === userId);  // Filter messages related to this user
  //   console.log("message--",user);
  //   if (userMessages?.length === 0) return null;  // No messages found
    
  //   const lastMessage = messages && userMessages[userMessages.length - 1];  // Get the last message
    
  //   return lastMessage?.createdAt ? new Date(lastMessage.createdAt) : null; // Return the date of the last message
  // };
    
  // // Format the date (you can use moment.js or Date functions)
  // const formatDate = (date) => {
  //   if (!date) return 'No messages'; // If no message exists
  //   return date.toLocaleDateString(); // Format date as per your requirements
  // };

  // const lastMessageDate = getLastMessageDate(user._id);  // Get the last message date for this user
  
  const formatDate = (date) => {
     console.log("message--",date);
      if (!date) return 'No messages'; // If no message exists
     return date.toLocaleDateString(); // Format date as per your requirements
     };
  
  

 
  const selectedUserHandler = (user)=>{
    dispatch(setSelectedUser(user))

  }
  return (
    <>
      <div onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-[#412e53f0]' : ''} flex items-center space-x-4 my-2 transition-all duration-300 ease-in-out hover:bg-[#412e53f0] hover:scale-[1.05] hover:shadow-lg rounded p-3 mx-3 cursor-pointer`}>
        <div className={`avatar ${isOnline ? 'online' : '' }`}>
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img src={picture} alt='pic' className="w-full h-full object-cover" />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className="flex justify-between items-center">
            <p className='text-white text-lg font-semibold'>{user.name}</p>
            <p className='font-thin text-xs text-[#0ffffff]'>{formattedDate}</p>
          </div>
          <p className='font-thin text-sm text-[#0ffffff]'>{user.email}</p>
        </div>
      </div>
    </>
  );
};

export default OtherUser;





