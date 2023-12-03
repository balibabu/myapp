// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { Login, Logout } from '../http/Auth';

const AuthContext = createContext();

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

  const login=(username,password)=>{
        if (Login(username,password)){
            setLoggedIn(true);
            return true;
        }else{
            return false;
        }
  }

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
