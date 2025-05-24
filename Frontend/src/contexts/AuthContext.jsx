import React, { createContext, useState, useContext, useEffect } from "react";
import {
  loginUser as apiLoginUser,
  registerUser as apiRegisterUser,
} from "../services/authServices.jsx";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("authUser ");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser ", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser ");
    }
  }, [user]);

  const loginUser = async (email, password) => {
    const data = await apiLoginUser(email, password);
    setUser(data);
    return data;
  };

  const registerUser = async (username, email, password) => {
    const data = await apiRegisterUser(username, email, password);
    setUser(data);
    return data;
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
