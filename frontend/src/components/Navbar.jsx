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
    token != "null" && (
      <div className="navbar flex justify-between w-full px-20 py-10 relative">
       <NavLink to='/home'> <h3>Khaatabook</h3></NavLink>

        <div className="links flex gap-4">
          <a href="/home">Home</a>
          <a href="/hisaab/create">Create new hisaab</a>
          <button className="text-red-500" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default Navbar;
