import React from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaSignInAlt } from "react-icons/fa";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-emerald-200 to-green-300 px-6 text-center">
      <div className="mb-6 text-5xl text-green-800 flex items-center gap-3 font-bold">
        <FaLeaf className="text-green-600" />
        Welcome to Hisaab
      </div>

      <p className="text-xl text-green-900 max-w-xl mb-8">
        A peaceful way to manage your financial garden 🌿
      </p>

      <Link
        to="/login"
        className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
      >
        <FaSignInAlt />
        Login to Continue
      </Link>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 text-green-800 text-sm">
        <Link to="/about" className="hover:underline">About Hisaab</Link>
        <span className="hidden sm:inline">•</span>
        <Link to="/features" className="hover:underline">Features</Link>
        <span className="hidden sm:inline">•</span>
        <Link to="/contact" className="hover:underline">Contact Us</Link>
      </div>
    </div>
  );
};

export default Welcome;
