// import React, { useState } from 'react';
// import { Link , useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';




// const Register = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     picture: null
//   });

//  const navigate = useNavigate()

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };


//   const [imagePreview, setImagePreview] = useState();

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         console.log("Please upload an image file.");
//         return;
//       }
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setImagePreview(reader.result);
//         setFormData({ ...formData, picture: file });
//       };
//       reader.onerror = () => {
//         console.log("Something went wrong, picture not uploaded.");
//       };
//     }
//   };






//   const handleNext = () => {
//     if (formData.name && formData.email && formData.password) {
//       setStep(step + 1);
//     } else {
//       toast.error("Please fill all fields.")
//       console.log("Please fill all fields.");
//     }
//   };





//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     // Ye Formdata ka object banaya hai takey picture ko server per bhejna hai .. warna is ki zarorat nhi hoti
//     const formSendData = new FormData();
//     formSendData.append('name', formData.name);
//     formSendData.append('email', formData.email);
//     if (formData.phone) {
//       formSendData.append('phone', formData.phone)
//     }
//     formSendData.append('password', formData.password);
//     if (formData.picture) {
//       formSendData.append('picture', formData.picture);
//     }


//     try {
//       const res = await axios.post('http://localhost:8080/api/user/register', formSendData,
//         {
//           headers: {
//             'Content-Type': `multipart/form-data`,

//             // 'Authorization': 'Bearer YOUR_JWT_TOKEN',  // JWT token bhejna ho to istemal kare ge 
//           },
//           withCredentials: true,
//         }
//       );
//       if(res.data.success){
//         navigate('/signin')
//         toast.success(res.data.message);

//       }
//       console.log(res)
//     } catch (error) {
//       toast.success(error.message);
//       console.log(error)

//     }
//   };

//   return (
//     <div className='h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black'>
//       <div className='max-w-80 w-full bg-[#00000050] p-5 rounded-2xl grid gap-5'>
//         <h1 className='text-5xl text-white font-bold'>Sign_Up</h1>
//         <p className='text-[#FFFFFFB3]'>
//           {step === 1 ? "Fill all fields to Register." : "Please select your picture for better results."}
//         </p>
//         <form onSubmit={handleSubmit} className='text-white space-y-5'>
//           {step === 1 ? (
//             <>
//               <div className='relative'>
//                 <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
//                   <i className="fa-solid fa-user"></i>
//                 </div>
//                 <input
//                   type="text"
//                   name='name'
//                   aria-label="Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder='Enter your Name here...'
//                   className='w-full bg-[#FFFFFF30] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#00000050] focus:outline-none ring-1 focus:ring-neon-blue drop-shadow-lg'
//                 />
//               </div>

//               <div className='relative'>
//                 <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
//                   <i className="fa-solid fa-envelope-open"></i>
//                 </div>
//                 <input
//                   type="email"
//                   name='email'
//                   aria-label="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder='Your Email Address'
//                   className='w-full bg-[#FFFFFF30] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#00000050] focus:outline-none ring-1 focus:ring-neon-blue drop-shadow-lg'
//                 />
//               </div>



//               <div className='relative'>
//                 <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
//                   <i className="fa-solid fa-phone"></i>
//                 </div>
//                 <input
//                   type="text"
//                   name='phone'
//                   aria-label="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder='Your Phone'
//                   className='w-full bg-[#FFFFFF30] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#00000050] focus:outline-none ring-1 focus:ring-neon-blue drop-shadow-lg'
//                 />
//               </div>

//               <div className='relative'>
//                 <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
//                   <i className="fa-solid fa-lock"></i>
//                 </div>
//                 <input
//                   type="password"
//                   name='password'
//                   aria-label="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder='Type your Password here'
//                   className='w-full bg-[#FFFFFF30] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#00000050] focus:outline-none ring-1 focus:ring-neon-blue drop-shadow-lg'
//                 />
//               </div>
//               <button
//                 type='button'
//                 onClick={handleNext}
//                 className='bg-gradient-to-r from-blue-400 to-cyan-200 w-full py-2 font-semibold rounded-full transition-transform transform hover:scale-105'
//               >
//                 Next
//               </button>
//             </>
//           ) : (
//             <>
//               <div className='flex justify-center items-center'>
//                 {imagePreview && (
//                   <img
//                     src={imagePreview}
//                     alt="Profile Preview"
//                     className='rounded-full w-56 h-56 object-cover mb-3 border-4 border-blue-300 shadow-lg'
//                   />
//                 )}
//               </div>
//               <div className='relative'>
//                 <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
//                   <i className="fa-solid fa-camera"></i>
//                 </div>
//                 <input
//                   type="file"
//                   onChange={handleFile}
//                   placeholder='Photo'
//                   className='w-full bg-white-light py-2 pl-12 pr-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue drop-shadow-lg'
//                 />
//               </div>
//               <button
//                 type='submit'
//                 className='bg-gradient-to-r from-blue-400 to-cyan-200 w-full py-2 font-semibold rounded-full transition-transform transform hover:scale-105'
//               >
//                 Submit
//               </button>
//             </>
//           )}
//         </form>
//         <div className='text-dull-white text-sm text-center border-t pt-4 border-white-light'>
//           <p>Already have an account? <Link to='/signin' className='text-neon-blue font-semibold'>Sign In</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;



































import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../assets/config.jsx';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    picture: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [imagePreview, setImagePreview] = useState();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, picture: file });
      };
      reader.onerror = () => {
        toast.error("Something went wrong, picture not uploaded.");
      };
    }
  };

  const handleNext = () => {
    if (formData.name && formData.email && formData.password) {
      setStep(step + 1);
    } else {
      toast.error("Please fill all required fields.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData object creation to send picture to server
    const formSendData = new FormData();
    formSendData.append('name', formData.name);
    formSendData.append('email', formData.email);

    // Only append phone if it is provided
    if (formData.phone) {
      formSendData.append('phone', formData.phone);
    }

    formSendData.append('password', formData.password);

    // Only append picture if it is provided
    if (formData.picture) {
      formSendData.append('picture', formData.picture);
    }

    try {
      let res = await axios.post(`${BACKEND_URL}/api/user/register`, formSendData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log(res);

      if (res.data.success) {
        navigate('/')
        toast.success(res.data.message);
        console.log(res);
      }
    } catch (error) {
      toast.error(error.response.data.message);  
      console.log(error);
    }
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black'>
      <div className='max-w-80 w-full bg-[#00000050] p-5 rounded-2xl grid gap-5'>
        <h1 className='text-5xl text-white font-bold'>Sign_Up</h1>
        <p className='text-[#FFFFFFB3]'>
          {step === 1 ? "Fill all fields to Register." : "Please select your picture for better results."}
        </p>
        <form onSubmit={handleSubmit} className='text-white space-y-5'>
          {step === 1 ? (
            <>
              <div className='relative'>
                <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
                  <i className="fa-solid fa-user"></i>
                </div>
                <input
                  type="text"
                  name='name'
                  aria-label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter your Name here...'
                  className='w-full bg-[#FFFFFF30] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#00000050] focus:outline-none ring-1 focus:ring-neon-blue drop-shadow-lg'
                />
              </div>

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
                autoComplete='email'
                />
              </div>

              <div className='relative'>
                <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <input
                  type="text"
                  name='phone'
                  aria-label="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='Your Phone (optional)'
                  className='w-full bg-[#FFFFFF30] py-2 pl-12 pr-4 rounded-full transition duration-200 focus:bg-[#00000050] focus:outline-none ring-1 focus:ring-neon-blue drop-shadow-lg'
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
                  autoComplete="current-password"
                />
              </div>
              <button
                type='button'
                onClick={handleNext}
                className='bg-gradient-to-r from-blue-400 to-cyan-200 w-full py-2 font-semibold rounded-full transition-transform transform hover:scale-[1.05]'
              >
                Next
              </button>
            </>
          ) : (
            <>
              <div className='flex justify-center items-center'>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className='rounded-full w-56 h-56 object-cover mb-3 border-4 border-blue-300 shadow-lg'
                  />
                )}
              </div>
              <div className='relative'>
                <div className='absolute top-1 left-1 bg-white-medium p-2 rounded-full flex items-center justify-center text-blue-300'>
                  <i className="fa-solid fa-camera"></i>
                </div>
                <input
                  type="file"
                  onChange={handleFile}
                  placeholder='Photo'
                  className='w-full bg-white-light py-2 pl-12 pr-4 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-neon-blue drop-shadow-lg'
                />
              </div>
              <button
                type='submit'
                className='bg-gradient-to-r from-blue-400 to-cyan-200 w-full py-2 font-semibold rounded-full transition-transform transform hover:scale-[1.05]'
              >
                Submit
              </button>
            </>
          )}
        </form>
        <div className='text-dull-white text-sm text-center border-t pt-4 border-white-light'>
          <p>Already have an account? <Link to='/' className='text-neon-blue font-semibold'>Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
