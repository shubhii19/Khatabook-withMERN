import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores user info
  const [loading, setLoading] = useState(true); // loading while checking session
const backendUrl = 'http://localhost:3000'

  const login = async (email, password) => {
  const res = await axios.post(backendUrl+"/login", { email, password });
  const profile = await axios.get("/profile");
  setUser(profile.data.user); // context me user set
};
  // On mount, check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/profile");
        setUser(res.data.user);
      } catch (err) {
        setUser(null); // not logged in
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  

  const register = async (data) => {
    await axios.post("/register", data);
    const profile = await axios.get("/profile");
    setUser(profile.data.user);
  };

  const logout = async () => {
    await axios.get("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
