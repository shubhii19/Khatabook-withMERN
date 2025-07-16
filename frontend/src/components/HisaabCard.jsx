import React from "react";

const HisaabCard = ({ hisaab }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-2 text-gray-800 max-w-md w-full mx-auto">
      <h2 className="text-xl font-bold">{hisaab.title}</h2>
      <p className="text-sm text-gray-600">{hisaab.description}</p>

      <div className="flex flex-wrap gap-2 text-sm mt-2">
        {hisaab.encrypted && (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md">
            🔒 Encrypted
          </span>
        )}
        {hisaab.shareable && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
            🔗 Shareable
          </span>
        )}
        {hisaab.editpermissions === "true" || hisaab.editpermissions === true ? (
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
            ✏️ Editable
          </span>
        ) : (
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
            🔒 Read-only
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Last Updated: {new Date(hisaab.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default HisaabCard;
