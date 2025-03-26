import React, { useEffect } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../redux/userSlice';
import { BACKEND_URL } from '../assets/config.jsx';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    
  useEffect(()=>{
    const fetchOtherUser = async ()=>{
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${BACKEND_URL}/api/user`);
            dispatch(setOtherUsers(res.data))
            
        } catch (error) {
             console.log("can't provide users, Login first ", error)
            
        }
    };
    fetchOtherUser()


  },[])
}

export default useGetOtherUsers;