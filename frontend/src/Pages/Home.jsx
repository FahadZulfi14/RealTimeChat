import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import ChatBox from '../components/ChatBox';
import {useSelector} from 'react-redux';

const Home = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  const {selectedUser} = useSelector(store => store.user)

  
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = Cookies.token();
//     navigate.push('/dashboard'); 
// },[navigate])
      

  // const toggleSidebar = () => {
  //   setSidebarOpen(false);
  // };

  // console.log("selectedUser", selectedUser)

  return (
    <div className="min-h-screen h-screen flex w-full">

      {/* Sidebar */}
      <div className={`h-full transition-all ${selectedUser ? 'hidden' : 'w-full'} md:w-[30%] md:block`}>
        <SideBar />
      </div>


      {/*right side ChatBox */}
      <div className={`h-full transition-all ${selectedUser ? 'w-full' : 'hidden'} md:w-[70%] md:block`}>
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;
