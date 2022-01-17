import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

// =================================================================

const LoginProvider = (props) => {
  const history = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  // =================================================================

  const saveToken = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  // =================================================================

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    history("/login");
  };

  // =================================================================

  const state = {
    token,
    isLoggedIn,
    logout,
    saveToken,
    setIsLoggedIn,
  };
  // =================================================================

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default LoginProvider;