import React from 'react';
import useGetMessages from '../hooks/useGetMessages.jsx';
import Message from './Message.jsx';

import { useSelector } from 'react-redux';
import useGetRealTimeMsg from '../hooks/useGetRealTimeMsg.jsx';

const Messages = () => {
  useGetRealTimeMsg()
  useGetMessages();
  const { messages } = useSelector(store => store.message);



  
  


  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">

      {
       messages && messages?.map((message) => {
          return (
            <Message time="12:45" key={message._id}  message={message} date ={message}/>
          )
        })
      }

    </div>
  );
};

export default Messages;



















{/* <Message sender="self" time="12:46" text="I was always the one!" />
      <Message sender="other" time="12:47" text="But you are my brother!" /> */}





// import React from 'react'
// import Message from './Message'

// const Messages = () => {
//   return (
//     <div className='h-full flex-1 p-4 scrollbar-thin overflow-y-auto'>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
//         <Message/>
    
//       </div>
//   )
// }
      

// export default Messages;