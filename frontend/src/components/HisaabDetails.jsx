import React, { useState } from 'react';

const HisaabDetails = ({ hisaab }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 3000);
  };

  // Format date from JS Date or ISO string
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg mt-10 relative">
      {showCopied && (
        <div className="absolute copieddiv top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-2 bg-blue-500 rounded-md">
          <h3 className="text-blue-200 text-xl">link copied</h3>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Khaatabook</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            {hisaab.encrypted ? 'Encrypted' : 'Unencrypted'}
          </button>

          <button
            onClick={handleCopyLink}
            className="sharebtn text-gray-700 px-4 py-2 rounded flex items-center space-x-2"
          >
            <span>Share as a link</span>
          </button>

          <a
            href={`/hisaab/delete/${hisaab._id}`}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </a>

          <a
            href={`/hisaab/edit/${hisaab._id}`}
            className="bg-yellow-400 text-white px-4 py-2 rounded"
          >
            Edit
          </a>
        </div>
      </div>

      <div className="text-gray-500 mb-4">
        Created on {formatDate(hisaab.createdAt)}
      </div>

      <h2 className="text-xl font-semibold mb-2">{hisaab.title}</h2>
      <p className="text-gray-700">{hisaab.description}</p>
    </div>
  );
};

export default HisaabDetails;
