import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ Only Routes & Route
import Navbar from './components/Navbar';
import CreateHisaab from './components/CreateHisaab';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
       <ToastContainer />
      <Navbar /> {/* Optional Navbar */}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/hisaab/create" element={<CreateHisaab/>} />
        {/* <Route path="/hisaab/edit/:id" element={<EditHisaab />} /> */}
        {/* <Route path="/hisaab/view/:id" element={<ViewHisaab />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};

export default App;
