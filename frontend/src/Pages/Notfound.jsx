import React from 'react'

function Notfound() {
  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
        <h1 className='text-slate-400' >404 | Page Not Found</h1>
    </div>
  )
}

export default Notfound;

















// import { useState } from 'react';
// import OtherUsers from './OtherUsers.jsx';
// import { useSelector } from 'react-redux';

// const SideBar = () => {
//   const { otherUsers } = useSelector(store => store.user);
//   const [search, setSearch] = useState(""); // Search state

//   // Search change handler
//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   return (
//     <div className='h-full flex flex-col bg-[#13071ef0]'>
//       <div className='flex items-center justify-between px-4 py-3 shadow-xl'>
//         <div className='flex items-center space-x-4 transition duration-50 hover:bg-[#412e53f0] rounded cursor-pointer'>
//           <div className="w-12 h-12 rounded-full overflow-hidden">
//             <img src='https://photosly.in/wp-content/uploads/2024/07/boy-dp-pic14.jpg' alt='pic' className="w-full h-full object-cover" />
//           </div>

//           <div className="flex flex-col">
//             <p className='text-white'>Jessi Capliri</p>
//             <p className='font-thin text-sm text-green-400'>online</p>
//           </div>
//         </div>
//       </div>

//       {/* Search box */}
//       <div className='bg-[#13071ef0] mx-6 my-2'>
//         <input
//           value={search}
//           placeholder='Search...'
//           onChange={handleSearchChange}  // Handle search change
//           className='w-full bg-[#13071ef0] py-2 pl-4 pr-4 rounded-full transition duration-200 focus:bg-[#FFFFFF30] focus:outline-none ring-1 focus:ring-neon-blue'
//         />
//       </div>

//       {/* Dynamic filtering of users */}
//       <OtherUsers search={search} />
//     </div>
//   );
// };

// export default SideBar;












// import React from 'react';
// import OtherUser from './OtherUser.jsx';
// import { useSelector } from 'react-redux';

// const OtherUsers = ({ search }) => {
//   const { otherUsers } = useSelector(store => store.user);
  
//   if (!otherUsers || !otherUsers?.allUsers) return <div>Loading...</div>;

//   // Filter users based on the search term
//   const filteredUsers = otherUsers.allUsers.filter((user) =>
//     user.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className='bg-[#13071ef0] py-2 px-2 m-0 flex-1 h-full scrollbar-thin overflow-y-auto'>
//       {/* Map through filtered users */}
//       {filteredUsers.length > 0 ? (
//         filteredUsers.map((user) => {
//           return <OtherUser key={user._id} user={user} />;
//         })
//       ) : (
//         <div className="text-white text-center">No users found</div>
//       )}
//     </div>
//   );
// };

// export default OtherUsers;











// import React from 'react';  
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedUser } from '../redux/userSlice.jsx';  

// const OtherUser = ({ user }) => {
//   const picture = user.picture.secure_url;
//   const dispatch = useDispatch();
//   const { selectedUser } = useSelector(store => store.user);

//   const selectedUserHandler = (user) => {
//     dispatch(setSelectedUser(user));
//   };

//   return (
//     <div
//       onClick={() => selectedUserHandler(user)}
//       className={`${
//         selectedUser?._id === user?._id ? 'bg-[#412e53f0]' : ''
//       } flex items-center space-x-4 my-2 transition-all duration-300 ease-in-out hover:bg-[#412e53f0] hover:scale-[1.05] hover:shadow-lg rounded p-3 mx-3 cursor-pointer`}
//     >
//       <div className="w-14 h-14 rounded-full overflow-hidden">
//         <img src={picture} alt='pic' className="w-full h-full object-cover" />
//       </div>

//       <div className='flex flex-col flex-1'>
//         <div className="flex justify-between items-center">
//           <p className='text-white text-lg font-semibold'>{user.name}</p>
//           <p className='font-thin text-xs text-[#0ffffff]'>11/12/2024</p>
//         </div>
//         <p className='font-thin text-sm text-[#0ffffff]'>{user.email}</p>
//       </div>
//     </div>
//   );
// };

// export default OtherUser;