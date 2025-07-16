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

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import HisaabCard from "./HisaabCard"; // ✅ Import the component
// import { data } from "react-router-dom";

// const Home = () => {
//   const { token, setToken, backendUrl } = useContext(AppContext);
//   const [hisaabs, setHisaabs] = useState([]);
//   const fetchHisaabs = async () => {
//     try {
//       const res = await axios.get(
//         backendUrl + "/hisaab/user/all",
//         // { email, password },
//         { withCredentials: true }
//       );
//       const data = res.data.hisaabs;
//       console.log(res.data.hisaabs, "res");
//       console.log(data,'data')
//       // setHisaabs(hisaabs);
//     } catch (err) {
//       console.error("Failed to fetch hisaabs:", err);
//     }
//   };
//   useEffect(() => {
//     const localToken = localStorage.getItem("token");
//     if (localToken && !token) {
//       setToken(localToken);
//     }
//   }, [token, setToken]);

//   useEffect(() => {
//     if (token) {
//       fetchHisaabs();
//     }
//   }, [token]);

//   return (
//     token && (
//       <div className="bg-rose-400 min-h-screen p-6">
//         {
//           hisaabs.map((item,index)=>(
//             <HisaabCard item={item}/>
//           ))
//         }
//       </div>
//     )
//   );
// };

// export default Home;















// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import HisaabCard from "./HisaabCard";

// const Home = () => {
//   const { token, setToken, backendUrl } = useContext(AppContext);
//   const [hisaabs, setHisaabs] = useState([]);

//   const fetchHisaabs = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/hisaab/user/all`, {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`, // Optional, depending on how your backend validates
//         },
//       });
//       const data = res.data.hisaabs;
//       console.log(data, "hisaabs received");
//       setHisaabs(data); // ✅ Don't forget this
//     } catch (err) {
//       console.error("Failed to fetch hisaabs:", err);
//     }
//   };

//   useEffect(() => {
//     const localToken = localStorage.getItem("token");
//     if (localToken && !token) {
//       setToken(localToken);
//     }
//   }, [token, setToken]);

//   useEffect(() => {
//     if (token) {
//       fetchHisaabs();
//     }
//   }, [token]);

//   return (
//   token && (
//     <div className=" min-h-screen p-6">
//       <h1 className="text-2xl font-bold text-black mb-4">Your Hisaabs</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {/* <h1 className="text-2xl font-bold text-black mb-4">Your Hisaabs</h1> */}
//         {hisaabs.map((item, index) => (
//           <HisaabCard hisaab={item} key={index} />
//         ))}
//       </div>
//     </div>
//   )
// );

// };

// export default Home;
















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
