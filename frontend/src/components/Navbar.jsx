// import React, { useContext } from 'react';
// import 'remixicon/fonts/remixicon.css';
// import { AppContext } from '../context/AppContext';

// const Navbar = () => {
//   const {token}= useContext(AppContext);
//   console.log('token->',token)
//   return (
//     <div className="navbar flex justify-between w-full px-20 py-10 relative">
//       <h3>Khaatabook</h3>

//       {/* {showError && (
//         <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-2 bg-red-500 rounded-md">
//           <h3 className="text-red-200">some error</h3>
//         </div>
//       )} */}

//       {token && (
//         <div className="links flex gap-4">
//           <a href="/home">Home</a>
//           <a href="/hisaab/create">Create new hisaab</a>
//           <a className="text-red-500" href="/logout">Logout</a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

// import React, { useContext } from 'react';
// import 'remixicon/fonts/remixicon.css';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Navbar = () => {
//   const { token, setToken, backendUrl } = useContext(AppContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//   try {
//     await axios.post(backendUrl + '/user/api/logout', null, {
//       withCredentials: true,
//     });

//     localStorage.removeItem("token");
//     setToken(null);

//     toast.success("Logged out successfully!");
//     navigate("/login");
//   } catch (err) {
//     console.error(err);
//     toast.error("Error during logout!");
//   }
// };

// useEffect(() => {
//   const localToken = localStorage.getItem("token");
//   if (localToken && !token) {
//     setToken(localToken);
//   }
// }, [token]);

//   return (
//     <div className="navbar flex justify-between w-full px-20 py-10 relative">
//       <h3>Khaatabook</h3>

//       {token && (
//         <div className="links flex gap-4">
//           <a href="/home">Home</a>
//           <a href="/hisaab/create">Create new hisaab</a>
//           <button
//             className="text-red-500"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(backendUrl + "/user/api/logout", null, {
        withCredentials: true,
      });

      localStorage.removeItem("token");
      setToken(null);

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Error during logout!");
    }
  };
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && !token) {
      setToken(localToken);
    }
  }, [token]);

  return (
    <div className="navbar flex justify-between w-full px-20 py-10 relative">
      <h3>Khaatabook</h3>
      {token && token !== "null" && (
        <div className="links flex gap-4">
          <a href="/home">Home</a>
          <a href="/hisaab/create">Create new hisaab</a>
          <button className="text-red-500" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
