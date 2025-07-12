import React, { useState } from 'react';

const EditHisaab = ({ hisaab }) => {
  const [formData, setFormData] = useState({
    title: hisaab.title || '',
    description: hisaab.description || '',
    encrypted: hisaab.encrypted || false,
    passcode: hisaab.passcode || '',
    shareable: hisaab.shareable || false,
    editpermissions: hisaab.editpermissions || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/hisaab/edit/${hisaab._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Hisaab updated successfully!');
        // Optional: redirect or show confirmation
      } else {
        alert('Error updating hisaab.');
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Edit your Hisaab!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              value={formData.title}
              name="title"
              type="text"
              placeholder="Shopping Hisaab, Ghar ka Kharch..."
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Daal, Aata, Cheeni"
              className="resize-none w-full p-2 border border-gray-300 rounded h-32"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                name="encrypted"
                type="checkbox"
                className="form-checkbox"
                checked={formData.encrypted}
                onChange={handleChange}
              />
              <span className="ml-2">Encrypt this file</span>
            </label>
            <input
              value={formData.passcode}
              name="passcode"
              type="password"
              placeholder="Passcode"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                name="shareable"
                type="checkbox"
                className="form-checkbox"
                checked={formData.shareable}
                onChange={handleChange}
              />
              <span className="ml-2">Shareable file?</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                name="editpermissions"
                type="checkbox"
                className="form-checkbox"
                checked={formData.editpermissions}
                onChange={handleChange}
              />
              <span className="ml-2">Edit permissions.</span>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Update Hisaab
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHisaab;
