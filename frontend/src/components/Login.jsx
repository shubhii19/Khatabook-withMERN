import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, setToken } = useContext(AppContext); // Use context token
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/user/api/login",
        { email, password },
        { withCredentials: true }
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token); // Set in global context
        toast.success("Loggedin successfully");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <Navbar/> */}

      <form
        className="min-h-[80vh] flex items-center"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-400 rounded-xl text-zinc-600 text-sm shadow-lg">
          <NavLink to="/">
            <button
              type="button"
              className="bg-[#5F6FFF] px-4 py-1 text-white w-full py-2 rounded-md text-base"
            >
              ← Back
            </button>
          </NavLink>
          <p className="text-2xl font-semibold">Login</p>

          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zinc-300 w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
