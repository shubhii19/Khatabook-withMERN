import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import HisaabCard from "./HisaabCard";

const Home = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const [hisaabs, setHisaabs] = useState([]);

  const fetchHisaabs = async () => {
    try {
      const res = await axios.get(`${backendUrl}/hisaab/user/all`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.hisaabs;
      console.log(data, "hisaabs received");
      setHisaabs(data);
    } catch (err) {
      console.error("Failed to fetch hisaabs:", err);
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && !token) {
      setToken(localToken);
    }
  }, [token, setToken]);

  useEffect(() => {
    if (token) {
      fetchHisaabs();
    }
  }, [token]);

  return (
    token && (
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Your Hisaabs
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hisaabs.map((item, index) => (
              <HisaabCard hisaab={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
