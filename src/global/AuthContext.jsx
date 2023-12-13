import React, { createContext, useEffect, useState } from 'react';
import { Login, Logout, getUserInfo } from '../http/Auth';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setUsername] = useState('Boss');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const load=async()=>{
      const usr=await getUserInfo(token);
      if(usr){
        setUsername(usr);
      }else{
        setLoggedIn(false);
      }
    }
    if (token) {
      load();
    }
  }, [token]);


  const logout = () => {
    setLoggedIn(false);
    setToken(null);
    Logout().then(()=>window.location.reload());
  };

  const login = async (username, password) => {
    const token = await Login(username, password);
    if (token) {
      setToken(token);
      setLoggedIn(true);
      setUsername(username);
      return true;
    }
    return false;
  }

  const contextData = {
    loggedIn,
    login,
    logout,
    username,
    token
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
