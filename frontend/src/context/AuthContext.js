// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Optionally, you can add code to check for an existing logged-in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userData) => {
    const response = await userService.login(userData);
    setUser(response.user);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response; // return the response to access the redirectUrl
  };

  const value = {
    user,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
