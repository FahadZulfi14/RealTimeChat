import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice.jsx';
import { BACKEND_URL } from '../assets/config.jsx';

const useGetMessages = ()=> {
  const { selectedUser } = useSelector(store => store.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) {
      console.log('No selected user or user ID is invalid');
      return;  // Don't make the API call if selectedUser is not valid
    }


    
    
    
    
    
    const fetchMessages = async () => {
        try {
          axios.defaults.withCredentials = true;
          const res = await axios.get(`${BACKEND_URL}/api/message/${selectedUser?._id}`);
          dispatch(setMessages(res.data))
          
        } catch (error) {
          console.log('Error fetching messages', error)
        }
      };
      

    fetchMessages();

  }, [selectedUser?._id, setMessages])
};

export default useGetMessages;