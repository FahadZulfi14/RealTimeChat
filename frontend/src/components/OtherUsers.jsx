import React from 'react';
import OtherUser from './OtherUser.jsx';
import useGetOtherUsers from '../hooks/useGetOtherUsers.jsx';
import { useSelector } from 'react-redux';

const OtherUsers = ({search}) => {
  // my custom hook
  useGetOtherUsers()
  const { otherUsers } = useSelector(store => store.user);
  // console.log(otherUsers)
  if (!otherUsers || !otherUsers?.allUsers) return <div>Loading...</div>;


  //  Filter users based on the search term
  const filteredUsers = otherUsers.allUsers.filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
  );




  return (
       <div className='bg-[#13071ef0] py-2 px-2 m-0 flex-1 h-full scrollbar-thin overflow-y-auto'>
         {/* Map through filtered users */}
       {filteredUsers.length > 0 ? (
      filteredUsers.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })
       ) : (
            <div className="text-white text-center">No users found</div>
          )}
         </div>
      );
    };











  // return (
    
  //   <div className='bg-[#13071ef0] py-2 px-2 m-0 flex-1 h-full scrollbar-thin overflow-y-auto'>
  //     {
  //       otherUsers.allUsers.map((user) => {
  //         return (
  //           <OtherUser key={user._id} user={user} />
  //         )
  //       })
  //     }
  //   </div>
  // )



export default OtherUsers;


