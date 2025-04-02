// import React, { useEffect } from 'react';
// import axios from 'axios';
// import {useDispatch} from 'react-redux'
// import { setOtherUsers } from '../redux/userSlice';
// import { BACKEND_URL } from '../assets/config.jsx';

// const useGetOtherUsers = () => {
//     const dispatch = useDispatch();

    
//   useEffect(()=>{
//     const fetchOtherUser = async ()=>{
//         try {
//             axios.defaults.withCredentials = true;
//             const res = await axios.get(`${BACKEND_URL}/api/user`);
//             dispatch(setOtherUsers(res.data))
            
//         } catch (error) {
//              console.log("can't provide users, Login first ", error)
            
//         }
//     };
//     fetchOtherUser()


//   },[])
// }

// export default useGetOtherUsers;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { BACKEND_URL } from '../assets/config.jsx';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    
    // State variables for loading and error handling
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOtherUsers = async () => {
            setLoading(true);
            setError(null); // Reset error state on new request

            try {
                // Ensure credentials are included for the request
                const res = await axios.get(`${BACKEND_URL}/api/user`, {
                    withCredentials: true,
                });
                
                // Dispatch the data to the Redux store
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.error("Can't fetch users, Login first", error);
                setError("There was an error fetching users. Please try again.");
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };

        fetchOtherUsers();
    }, [dispatch]);

    // Return loading and error states so that components can use them
    return { loading, error };
};

export default useGetOtherUsers;
