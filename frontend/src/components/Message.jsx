
import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  const formattedDate = moment(message.updatedAt).format('LT');

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSender = authUser?._id === message?.senderId;

  return (
    <div
      ref={scroll}
      className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={isSender ? authUser?.picture.secure_url : selectedUser?.picture.secure_url}
            alt="User Avatar"
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 mx-1">{formattedDate}</time>
      </div>
      <div
        // className={`chat-bubble ${isSender ? 'bg-[#dee9f7] text-black' : 'bg-white text-black'} shadow-md ${
        className={`chat-bubble ${isSender ? 'bg-[#dcf8c6] text-black' : 'bg-[#fff] text-black'} shadow-lg ${
          message.picture ? 'p-2 border border-gray-300 rounded-lg' : 'rounded-lg'
        }`}
        style={message.picture ? { maxWidth: '250px' } : {}}
      >
        {message.picture && (
          <img
            src={message.picture}
            alt="Attachment"
            className="w-full rounded-md"
          />
        )}
        {message.message && (
          <p className="m-0">{message.message}</p>
        )}
      </div>
    </div>
  );
};

export default Message;







































































// import React from 'react'

// const Message = () => {
//     return (
//         <div className="chat chat-start">
//             <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                     <img
//                         alt="Tailwind CSS chat bubble component"
//                         src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//                 </div>
//             </div>
//             <div className="chat-header">
//                 {/* Obi-Wan Kenobi */}
//                 <time className="text-xs opacity-50 text-black">12:45</time>
//             </div>
//             <div className="chat-bubble">You were the Chosen One!</div>
           
//         </div>
//     )
// }

// export default Message