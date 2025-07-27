// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";

// const ViewHisaab = () => {
//   const { backendUrl, token } = useContext(AppContext);
//   const { id } = useParams();
//   console.log(id);
//   const [hisaab, setHisaab] = useState(null);
//   const fetchHisaab = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/hisaab/view/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       console.log(res, "res");
//       setHisaab(res.data.hisaab);
//     } catch (err) {
//       console.error("Error fetching hisaab:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchHisaab();
//     if (token) {
//       fetchHisaab();
//     }
//   }, [id, backendUrl, token]);

//   if (!hisaab) return <p className="text-center mt-10">Loading...</p>;

//   return (
//   <div className="min-h-screen bg-white py-10">
//     <button
//         onClick={() => window.history.back()}
//         className="mt-4 ml-24  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//       >
//         ← Back
//       </button>
//     <div className="max-w-2xl m-5 mx-auto px-4 border rounded-lg shadow p-6">
//       <h2 className="text-2xl font-bold mb-4">{hisaab.title}</h2>
//       <p className="text-gray-700 mb-2">Amount: ₹{hisaab.amount}</p>
//       <p className="text-gray-700 mb-2">Description: {hisaab.description}</p>
//       <p className="text-gray-500 text-sm mb-4">
//         Created At: {new Date(hisaab.createdAt).toLocaleString()}
//       </p>

      
//     </div>
//   </div>
// );

// };

// export default ViewHisaab;



import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ViewHisaab = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [hisaab, setHisaab] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHisaab = async () => {
    try {
      const res = await axios.get(`${backendUrl}/hisaab/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setHisaab(res.data.hisaab);
    } catch (err) {
      console.error("Error fetching hisaab:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchHisaab();
    }
  }, [id, token]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  if (!hisaab) {
    return <p className="text-center mt-10 text-red-500">No data found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
        >
          ← Back
        </button>

        <div className="bg-white p-6 shadow rounded-lg border">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            {hisaab.title}
          </h2>
          <p className="text-gray-800 text-lg mb-2">
            💰 <span className="font-semibold">Amount:</span> ₹{hisaab.amount}
          </p>
          <p className="text-gray-700 mb-2">
            📝 <span className="font-semibold">Description:</span>{" "}
            {hisaab.description}
          </p>
          <p className="text-gray-500 text-sm mt-4">
            📅 Created At: {new Date(hisaab.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewHisaab;
