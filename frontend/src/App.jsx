// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Only Routes & Route
// import Navbar from "./components/Navbar";
// import CreateHisaab from "./components/CreateHisaab";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Home from "./components/Home";

// const App = () => {
//   return (
//     <div>
//       <ToastContainer />
//       <Navbar /> {/* Optional Navbar */}
//       if (!token) {<Navigate to="/login" />}
//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/hisaab/create" element={<CreateHisaab />} />

//       </Routes>
//     </div>
//   );
// };

// export default App;

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateHisaab from "./components/CreateHisaab";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import { AppContext } from "./context/AppContext"; // don't forget to import this
import ViewHisaab from "./components/ViewHisaab";
import EditHisaab from "./components/EditHisaab ";

const App = () => {
  const { token } = useContext(AppContext); // ✅ get token from context

  return (
    <div>
      <ToastContainer />
      {/* <Navbar /> */}

      {/* <Routes> */}
        {/* Redirect root based on token
        <Route path="/home" element={<Home/>}/> */}
        {/* <Route
          path="/"
          element={<Navigate to={token ? "/home" : "/login"} replace />}
        /> */}

        {/* ✅ Protected home route */}
        {/* <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        /> */}

        {/* Public routes */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}

        {/* Protected routes */}
        {/* <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/hisaab/create"
          element={token ? <CreateHisaab /> : <Navigate to="/login" />}
        />
      </Routes> */}
      <Routes>
  {/* Redirect root based on token */}
  <Route
    path="/"
    element={<Navigate to={token ? "/home" : "/login"} replace />}
  />

  {/* Protected home route */}
  <Route
    path="/home"
    element={token ? <Home /> : <Navigate to="/login" />}
  />

  {/* Public routes */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected routes */}
  <Route
    path="/hisaab/create"
    element={token ? <CreateHisaab /> : <Navigate to="/login" />}
  />
  <Route path="/hisaab/view/:id" element={<ViewHisaab/>}/>
  <Route path="/hisaab/edit/:id" element={<EditHisaab/>}/>
</Routes>

    </div>
  );
};

export default App;
            