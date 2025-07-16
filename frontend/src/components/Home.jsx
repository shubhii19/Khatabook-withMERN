// import React, { useContext, useEffect } from 'react'
// import Navbar from './Navbar'
// import { AppContext } from '../context/AppContext'

// const Home = () => {
//   console.log('rendering')
//     const {token,setToken} = useContext(AppContext)
//     console.log('token from home',token)

//     useEffect(() => {
//         const localToken = localStorage.getItem("token");
//         if (localToken && !token) {
//           setToken(localToken);
//         }
//       }, [token]);
//   return  token && (
//     <div className='bg-rose-400'>

//       {/* <h1 className=''>hissabs</h1> */}
//     </div>
//   )
// }

// export default Home

import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import HisaabCard from "./HisaabCard"; // ✅ Import the component

const Home = () => {
  const { token, setToken ,backendUrl} = useContext(AppContext);
  const [hisaabs, setHisaabs] = useState([]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && !token) {
      setToken(localToken);
    }
  }, [token, setToken]);

  useEffect(() => {
    const fetchHisaabs = async () => {
      console.log('first')
      try {
        const res = await axios.get(backendUrl+'/hisaab/user/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res)
        setHisaabs(res.data.hisaabs);
      } catch (err) {
        console.error("Failed to fetch hisaabs:", err);
      }
    };

    if (token) {
      fetchHisaabs();
    }
  }, [token]);

  return (
    token && (
      <div className="bg-rose-400 min-h-screen p-6">
        {/* <Navbar /> */}
        <h1 className="text-2xl font-bold text-white mb-4">Your Hisaabs</h1>

        {hisaabs.length === 0 ? (
          <p className="text-white">No hisaabs found.</p>
        ) : (
          <ul className="space-y-4">
            {hisaabs.map((hisaab) => (
              <li key={hisaab._id}>
                <HisaabCard hisaab={hisaab} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  );
};

export default Home;
