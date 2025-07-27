import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const EditHisaab = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(AppContext);
  // console.log(id)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    encrypted: false,
    passcode: "",
    shareable: false,
    editpermissions: false,
  });

  const [loading, setLoading] = useState(true);
  const fetchHisaab = async () => {
    try {
      const res = await axios.get(`${backendUrl}/hisaab/view/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(res);
      const data = res.data.hisaab;
      console.log(data);
      setFormData({
        title: data.title || "",
        description: data.description || "",
        amount: data.amount || "",
        encrypted: data.encrypted || false,
        passcode: data.passcode || "",
        shareable: data.shareable || false,
        editpermissions: data.editpermissions || false,
      });

      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch hisaab data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchHisaab();
    }
  }, [id, backendUrl, token]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(backendUrl);
    try {
      const res = await axios.put(backendUrl + `/hisaab/edit/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Hisaab updated successfully!");
        navigate("/home");
      }
    } catch (err) {
      toast.error("Failed to update hisaab.");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-700">
        Edit Hisaab
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0"
          step="any"
        />

        <label className="flex items-center gap-3 text-gray-700">
          <input
            type="checkbox"
            name="encrypted"
            checked={formData.encrypted}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 focus:ring-indigo-500"
          />
          Encrypt this file
        </label>

        {formData.encrypted && (
          <input
            name="passcode"
            type="password"
            placeholder="Passcode"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.passcode}
            onChange={handleChange}
            required
          />
        )}

        <label className="flex items-center gap-3 text-gray-700">
          <input
            type="checkbox"
            name="shareable"
            checked={formData.shareable}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 focus:ring-indigo-500"
          />
          Shareable file?
        </label>

        <label className="flex items-center gap-3 text-gray-700">
          <input
            type="checkbox"
            name="editpermissions"
            checked={formData.editpermissions}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 focus:ring-indigo-500"
          />
          Edit permissions
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Update Hisaab
        </button>
      </form>
    </div>
  );
};

export default EditHisaab;
