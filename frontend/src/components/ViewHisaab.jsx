import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ViewHisaab = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { id } = useParams();
  console.log(id);
  const [hisaab, setHisaab] = useState(null);
  const fetchHisaab = async () => {
    try {
      const res = await axios.get(`${backendUrl}/hisaab/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log(res, "res");
      setHisaab(res.data.hisaab);
    } catch (err) {
      console.error("Error fetching hisaab:", err.message);
    }
  };

  useEffect(() => {
    fetchHisaab();
    if (token) {
      fetchHisaab();
    }
  }, [id, backendUrl, token]);

  if (!hisaab) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-2xl mx-auto px-4 border rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">{hisaab.title}</h2>
        <p className="text-gray-700 mb-2">Amount: ₹{hisaab.amount}</p>
        <p className="text-gray-700 mb-2">Description: {hisaab.description}</p>
        <p className="text-gray-500 text-sm">
          Created At: {new Date(hisaab.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ViewHisaab;
