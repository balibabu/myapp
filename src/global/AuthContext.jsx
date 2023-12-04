import React, { createContext, useEffect, useState } from 'react';
import { Login, Logout } from '../http/Auth';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const logout = () => {
    setLoggedIn(false);
    Logout();
  };

  const login =async (username, password) => {
    const status=await Login(username, password);
    if (status) {
      setLoggedIn(true);
      return true;
    }
    return false;
  }

  const contextData = {
    loggedIn,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
