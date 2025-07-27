// import React, { useContext, useEffect } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const { token, setToken, backendUrl } = useContext(AppContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//        await axios.post(backendUrl + "/user/api/logout", null, {
//         withCredentials: true,
//       });

//       localStorage.removeItem("token");
//       setToken(null);

//       toast.success("Logged out successfully!");
//       navigate("/login");
//     } catch (err) {
//       toast.error("Error during logout!");
//     }
//   };
  
//   useEffect(() => {
//     const localToken = localStorage.getItem("token");
//     if (localToken && !token) {
//       setToken(localToken);
//     }
//   }, [token]);

//   return (
//     token &&
//     token != "null" && (
//       <div className="navbar flex justify-between w-full px-20 py-10 relative">
//        <NavLink to='/home'> <h3>Khaatabook</h3></NavLink>

//         <div className="links flex gap-4">
//           <a href="/home">Home</a>
//           <a href="/hisaab/create">Create new hisaab</a>
//           <button className="text-red-500" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>
//     )
//   );
// };

// export default Navbar;


import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
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
    token &&
    token !== "null" && (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <NavLink to="/home">
            <h1 className="text-2xl font-bold text-indigo-600">Khaatabook</h1>
          </NavLink>

          <div className="flex space-x-6 items-center">
            <NavLink
              to="/home"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/hisaab/create"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Create New Hisaab
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  );
};

export default Navbar;
