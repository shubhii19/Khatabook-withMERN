// import React from "react";

// const HisaabCard = ({ hisaab }) => {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow-md space-y-2 text-gray-800 max-w-md w-full mx-auto">
//       <h2 className="text-xl font-bold">{hisaab.title}</h2>
//       <p className="text-sm text-gray-600">{hisaab.description}</p>

//       <div className="flex flex-wrap gap-2 text-sm mt-2">
//         {hisaab.encrypted && (
//           <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md">
//             🔒 Encrypted
//           </span>
//         )}
//         {hisaab.shareable && (
//           <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
//             🔗 Shareable
//           </span>
//         )}
//         {hisaab.editpermissions === "true" || hisaab.editpermissions === true ? (
//           <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
//             ✏️ Editable
//           </span>
//         ) : (
//           <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
//             🔒 Read-only
//           </span>
//         )}
//       </div>

//       <p className="text-xs text-gray-500">
//         Last Updated: {new Date(hisaab.updatedAt).toLocaleString()}
//       </p>
//     </div>
//   );
// };

// export default HisaabCard;










import React from "react";
import { useNavigate } from "react-router-dom";

const HisaabCard = ({ hisaab, onDelete }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/hisaab/view/${hisaab._id}`);
  };

  const handleEdit = () => {
    navigate(`/hisaab/edit/${hisaab._id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this hisaab?")) {
      onDelete(hisaab._id);
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md space-y-3 text-gray-700 max-w-md w-full mx-auto">
      <h2 className="text-xl font-semibold">{hisaab.title}</h2>
      <p className="text-sm text-gray-500">{hisaab.description}</p>

      <div className="flex flex-wrap gap-2 text-sm mt-3">
        {hisaab.encrypted && (
          <span className="bg-red-50 text-red-400 px-3 py-1 rounded-xl font-medium select-none">
            🔒 Encrypted
          </span>
        )}
        {hisaab.shareable && (
          <span className="bg-green-50 text-green-400 px-3 py-1 rounded-xl font-medium select-none">
            🔗 Shareable
          </span>
        )}
        {hisaab.editpermissions === "true" || hisaab.editpermissions === true ? (
          <span className="bg-blue-50 text-blue-400 px-3 py-1 rounded-xl font-medium select-none">
            ✏️ Editable
          </span>
        ) : (
          <span className="bg-gray-100 text-gray-400 px-3 py-1 rounded-xl font-medium select-none">
            🔒 Read-only
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400">
        Last Updated: {new Date(hisaab.updatedAt).toLocaleString()}
      </p>

      <div className="flex justify-end gap-3 pt-3">
        <button
          onClick={handleView}
          className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
        >
          View
        </button>
        <button
          onClick={handleEdit}
          className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HisaabCard;
