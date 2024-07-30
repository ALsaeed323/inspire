import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this for navigation
import userService from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false after user is retrieved from localStorage
  }, []);

  const login = async (userData) => {
    try {
      const response = await userService.login(userData);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Navigate based on user role
      if (response.user.role === 'admin') {
        navigate('/dashboard');
      } else if (response.user.role === 'user') {
        navigate('/profile');
      }
      return response;
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/signin'); // Redirect to signin after logout
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
