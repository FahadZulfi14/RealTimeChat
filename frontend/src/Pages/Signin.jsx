import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { BACKEND_URL } from '../assets/config.jsx';



const Signin = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
    };
    
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/login`, trimmedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_JWT_TOKEN',
          
        },
        withCredentials: true,
      });
      
      //       if(res.data.success){
      //         if(location.pathname !== "/"){
      //          navigate('/')
      //         }
      //       }else{
      //     if(location.pathname !== "/signin" && location.pathname !== "/register"){
      //      navigate('/signin')
      //  }
      //       }


      navigate('/home')
      toast.success(`Welcome ${res.data.name}, Login successfully!`);
      dispach(setAuthUser(res.data))
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }

  };




  return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black'>
      <div className='max-w-80 w-full bg-[#00000050] p-5 rounded-2xl grid gap-5'>
        <h1 className='text-5xl text-white font-bold'>Sign_In</h1>
        <p className='text-[#FFFFFFB3]'>Login your account.
        </p>
        <form onSubmit={handleSubmit} className='text-white space-y-5'>



          <div className='relative'>
            <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
              <i className="fa-solid fa-envelope-open"></i>
            </div>
            <input
              type="email"
              name='email'
              aria-label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Your Email Address'
              className='w-full bg-[#FFFFFF30] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#00000050] focus:outline-none ring-1 focus:ring-neon-blue drop-shadow-lg'
              autoComplete="email"
            />
          </div>





          <div className='relative'>
            <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
              <i className="fa-solid fa-lock"></i>
            </div>
            <input
              type="password"
              name='password'
              aria-label="Password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Type your Password here'
              className='w-full bg-[#FFFFFF30] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#00000050] focus:outline-none ring-1 focus:ring-neon-blue drop-shadow-lg'
              autoComplete="current-password"   // Password ke liye autocomplete set karna
            />
          </div>


          <button
            type='submit'
            className='bg-gradient-to-r from-blue-400 to-cyan-200 w-full py-2 font-semibold rounded-full transition-transform transform hover:scale-[1.05]'
          >
            Login
          </button>


        </form>
        <div className='text-dull-white text-sm text-center border-t pt-4 border-white-light'>
          <p>Don't have an account? <Link to='/register' className='text-neon-blue font-semibold'>Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signin;