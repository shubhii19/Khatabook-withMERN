import { useState } from "react";
import axios from "axios"; // import your configured axios instance
import { useNavigate } from "react-router-dom";

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/login", {
        email: emailOrUsername,
        password,
      });
      navigate("/profile"); // redirect on success
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="logincontainer w-full h-[80vh] flex items-center justify-center">
      <div className="loginpanel">
        <h3 className="text-2xl mb-3">Login</h3>
        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="flex flex-col gap-2 items-start"
        >
          <input
            type="text"
            placeholder="Email or Username"
            name="email"
            className="block px-3 py-2 border border-zinc-300 rounded-md w-full"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="block px-3 py-2 border border-zinc-300 rounded-md w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="block px-4 py-2 bg-blue-500 rounded-md text-white w-full"
          >
            Login
          </button>
        </form>
        <a className="mt-5 inline-block text-blue-500" href="/register">
          Don't have an account?
        </a>
      </div>
    </div>
  );
}

export default Login;
