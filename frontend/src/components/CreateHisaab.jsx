// import React, { useState } from 'react';

// const CreateHisaab = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     encrypted: false,
//     passcode: '',
//     shareable: false,
//     editpermissions: false,
//   });

//   const handleChange = (e) => {
//     const { name, type, checked, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Example: send form data to backend
//     fetch('/hisaab/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     }).then(response => {
//       if (response.ok) {
//         alert('Hisaab created!');
//         // reset or navigate
//       } else {
//         alert('Error creating hisaab.');
//       }
//     });
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="max-w-lg mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Create New Hisaab</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               name="title"
//               type="text"
//               placeholder="Shopping Hisaab, Ghar ka Kharch..."
//               className="w-full p-2 border border-gray-300 rounded"
//               value={formData.title}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-4">
//             <textarea
//               name="description"
//               placeholder="Daal, Aata, Cheeni"
//               className="resize-none w-full p-2 border border-gray-300 rounded h-32"
//               value={formData.description}
//               onChange={handleChange}
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="inline-flex items-center">
//               <input
//                 name="encrypted"
//                 type="checkbox"
//                 className="form-checkbox"
//                 checked={formData.encrypted}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">Encrypt this file</span>
//             </label>
//             <input
//               name="passcode"
//               type="password"
//               placeholder="Passcode"
//               className="w-full mt-2 p-2 border border-gray-300 rounded"
//               value={formData.passcode}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="inline-flex items-center">
//               <input
//                 name="shareable"
//                 type="checkbox"
//                 className="form-checkbox"
//                 checked={formData.shareable}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">Shareable file?</span>
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="inline-flex items-center">
//               <input
//                 name="editpermissions"
//                 type="checkbox"
//                 className="form-checkbox"
//                 checked={formData.editpermissions}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">Edit permissions.</span>
//             </label>
//           </div>
//           <div>
//             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//               Create New Hisaab
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateHisaab;





// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext'; // Assuming you use context for backendUrl
// import { toast } from 'react-toastify';

// const CreateHisaab = () => {
//   const navigate = useNavigate();
//   const { backendUrl } = useContext(AppContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     encrypted: false,
//     passcode: '',
//     shareable: false,
//     editpermissions: false,
//   });

//   const handleChange = (e) => {
//     const { name, type, checked, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         backendUrl+'/hisaab/create',
//         formData,
//         { withCredentials: true } // send cookie
//       );

//       console.log(response)
//       if (response.status === 201) {
//         toast.success('✅ Hisaab created successfully!');
//         navigate('/home'); // or wherever you want to redirect
//       }
//     } catch (err) {
//       alert('❌ Failed to create hisaab: ' + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="max-w-lg mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Create New Hisaab</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input
//               name="title"
//               type="text"
//               placeholder="Shopping Hisaab, Ghar ka Kharch..."
//               className="w-full p-2 border border-gray-300 rounded"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <textarea
//               name="description"
//               placeholder="Daal, Aata, Cheeni"
//               className="resize-none w-full p-2 border border-gray-300 rounded h-32"
//               value={formData.description}
//               onChange={handleChange}
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="inline-flex items-center">
//               <input
//                 name="encrypted"
//                 type="checkbox"
//                 className="form-checkbox"
//                 checked={formData.encrypted}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">Encrypt this file</span>
//             </label>
//             {formData.encrypted && (
//               <input
//                 name="passcode"
//                 type="password"
//                 placeholder="Passcode"
//                 className="w-full mt-2 p-2 border border-gray-300 rounded"
//                 value={formData.passcode}
//                 onChange={handleChange}
//                 required
//               />
//             )}
//           </div>
//           <div className="mb-4">
//             <label className="inline-flex items-center">
//               <input
//                 name="shareable"
//                 type="checkbox"
//                 className="form-checkbox"
//                 checked={formData.shareable}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">Shareable file?</span>
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="inline-flex items-center">
//               <input
//                 name="editpermissions"
//                 type="checkbox"
//                 className="form-checkbox"
//                 checked={formData.editpermissions}
//                 onChange={handleChange}
//               />
//               <span className="ml-2">Edit permissions</span>
//             </label>
//           </div>
//           <div>
//             <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//               Create New Hisaab
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateHisaab;









import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const CreateHisaab = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    encrypted: false,
    passcode: '',
    shareable: false,
    editpermissions: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        backendUrl + '/hisaab/create',
        formData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success('✅ Hisaab created successfully!');
        navigate('/home');
      }
    } catch (err) {
      alert('❌ Failed to create hisaab: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create New Hisaab</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              name="title"
              type="text"
              placeholder="Shopping Hisaab, Ghar ka Kharch..."
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Daal, Aata, Cheeni"
              className="resize-none w-full p-2 border border-gray-300 rounded h-24"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              name="amount"
              type="number"
              placeholder="Total amount (e.g. ₹1500)"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.amount}
              onChange={handleChange}
              required
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
            {formData.encrypted && (
              <input
                name="passcode"
                type="password"
                placeholder="Passcode"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
                value={formData.passcode}
                onChange={handleChange}
                required
              />
            )}
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
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                name="editpermissions"
                type="checkbox"
                className="form-checkbox"
                checked={formData.editpermissions}
                onChange={handleChange}
              />
              <span className="ml-2">Edit permissions</span>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded"
            >
              Create New Hisaab
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHisaab;
