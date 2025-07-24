import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import HisaabCard from "./HisaabCard";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const Home = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const [hisaabs, setHisaabs] = useState([]);
console.log(backendUrl)
  const fetchHisaabs = async () => {
    try {
      // http://localhost:3000/hisaab/user/all
      const res = await axios.get(backendUrl+'/hisaab/user/all', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res,"res")
      const data = res.data.hisaabs;
      console.log(data, "hisaabs received");
      setHisaabs(data);
    } catch (err) {
      console.log(err.message)
      console.error("Failed to fetch hisaabs:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/hisaab/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Update the UI
      setHisaabs((prev) => prev.filter((item) => item._id !== id));
      toast.success('Hisaab delete Successfully')
    } catch (err) {
      console.error("Failed to delete hisaab", err);
      alert("Error deleting hisaab");
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && !token) {
      setToken(localToken);
    }
    fetchHisaabs();
  }, [token, setToken]);

  useEffect(() => {
    if (token) {
      fetchHisaabs();
    }
  }, [token]);

  return (
    token  && (
      <>
       <Navbar/>
      <div className="min-h-screen bg-gray-100 py-10">
        
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Your Hisaabs
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hisaabs.map((item, index) => (
              <HisaabCard hisaab={item} key={index}  onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>
      </>
    )
  );
};

export default Home;
