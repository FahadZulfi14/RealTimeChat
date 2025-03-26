import { useState } from 'react';

import OtherUsers from './OtherUsers.jsx'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/userSlice.jsx';
import { BACKEND_URL } from '../assets/config.jsx';




const SideBar = () => {
   const { authUser } = useSelector(store => store.user)
  const dispatch = useDispatch();


  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/user/logout`);
       console.log(res);

      navigate('/');
      toast.success(res.data.message)
      dispatch(setAuthUser(null))

    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);

    }
  };


  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
 

  return (

    <div className='h-full flex flex-col bg-[#13071ef0]'>
      <div className='flex items-center justify-between px-4 py-3 shadow-xl'>
        <div className='flex items-center space-x-4 transition duration-50 hover:bg-[#412e53f0] rounded cursor-pointer'>

          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={authUser?.picture?.secure_url} alt='pic' className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col  ">
            {/* <p className='text-white'>{authUser.name}</p> */}
            <p className='font-semibold text-white'>{authUser?.name}</p>
            <p className='font-extralight text-sm text-white'>you</p>

          </div>
        </div>
        <button
          onClick={logoutHandler}
          className='bg-gradient-to-r from-blue-400 to-cyan-200 text-black py-1 px-3 font-semibold rounded transition-transform transform hover:scale-[1.05]' > Logout
        </button>

      </div>

      {/* --------------------------------------search box section------------- */}
      <div className='bg-[#13071ef0] mx-6 my-2'>
        
          <div className='relative  '>
            <button className='hover:scale-110 hover:bg-blue-300 hover:text-black  absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <input
              value={search}
              placeholder='search...'
              onChange={searchHandler}
              className='w-full bg-[#13071ef0] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#FFFFFF30] focus:outline-none ring-1 focus:ring-neon-blue'
            />
          </div>
        
      </div>
      <div>
      </div>

      {/* ---------------------------all user sidebar list---------- */}
      <OtherUsers search={search} />
    </div>

  )
};

export default SideBar;











// import SearchIcon from '@mui/icons-material/Search';
// import { IconButton } from '@mui/material';


// // <IconButton>
// // <SearchIcon />
// // </IconButton>





// // < div className = 'bg-[#13071ef0] mx-6 mb-3 ' >
// //   <div className='relative  '>
// //     <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>

// //       <i class="fa-solid fa-magnifying-glass"></i>
// //     </div>
// //     <input
// //       placeholder='search'
// //       className='w-full bg-[#13071ef0] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#FFFFFF30] focus:outline-none ring-1 focus:ring-neon-blue'
// //     />
// //   </div>
// //     </div >









