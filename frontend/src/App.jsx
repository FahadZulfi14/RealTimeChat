
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Home from "./Pages/Home.jsx";
// import Signin from "./Pages/Signin.jsx";
// import Register from "./Pages/Register.jsx";
// import Notfound from './Pages/Notfound.jsx'
// import io from "socket.io-client";
// import { setOnlineUsers } from "./redux/userSlice.jsx";
// import { BACKEND_URL } from "./assets/config.jsx";

// function App() {
  
//   const { authUser } = useSelector((store) => store.user);
  
//   const dispatch = useDispatch();

//   // Local state for socket connection
//   const [socket, setSocket] = useState(null);
  

//   useEffect(() => {
//     if (authUser) {
//       const socketInstance = io(`${BACKEND_URL}`, {
//         query: { userId: authUser._id },
//       });

//       setSocket(socketInstance); // Set socket in local state

//       socketInstance.on("getOnlineUser", (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });
      
//       return () => {
//         socketInstance.close(); // Clean up the socket connection on component unmount
//       };
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null); // Reset socket to null
//       }
//     }
//   }, [authUser]); // Runs only when authUser changes

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Agar user authenticated hai to Home par redirect karein, warna Signin */}
//         <Route path="/" element={authUser ? <Navigate to="/home" /> : <Signin />} />
//         <Route path="*" element={<Notfound />} />
//         <Route path="/register" element={<Register />} />
//         {/* Agar direct home access ho aur user authenticated na ho, to Signin par redirect karein */}
//         <Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;











import React, { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Pages/Home.jsx";
import Signin from "./Pages/Signin.jsx";
import Register from "./Pages/Register.jsx";
import Notfound from './Pages/Notfound.jsx'
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice.jsx";
import { setOnlineUsers } from "./redux/userSlice.jsx";
import { BACKEND_URL } from "./assets/config.jsx";
import { SocketContext } from "./context/SocketContext.jsx";

function App() {
  const socketContext = useContext(SocketContext);
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io(`${BACKEND_URL}`, {
        query: { userId: authUser._id },
      });
      

      // dispatch(setSocket(socket));
      socketContext.setSocket(socket);

      socket?.on("getOnlineUser", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        // dispatch(setSocket(null));
        socketContext.setSocket(null); // Reset socket to null
      }
    }
  }, [authUser]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Agar user authenticated hai to Home par redirect karein, warna Signin */}
        <Route path="/" element={authUser ? <Navigate to="/home" /> : <Signin />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/register" element={<Register />} />
        {/* Agar direct home access ho aur user authenticated na ho, to Signin par redirect karein */}
        <Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;