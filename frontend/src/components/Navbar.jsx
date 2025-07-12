import React from 'react';
import 'remixicon/fonts/remixicon.css';

const Navbar = ({ loggedin = true, showError = false }) => {
  return (
    <div className="navbar flex justify-between w-full px-20 py-10 relative">
      <h3>Khaatabook</h3>

      {showError && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-2 bg-red-500 rounded-md">
          <h3 className="text-red-200">some error</h3>
        </div>
      )}

      {loggedin && (
        <div className="links flex gap-4">
          <a href="/">Home</a>
          <a href="/hisaab/create">Create new hisaab</a>
          <a className="text-red-500" href="/logout">Logout</a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
