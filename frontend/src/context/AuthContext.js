import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to retrieve user from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (userData) => {
    try {
      const response = await userService.login(userData);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));

      if (['admin', 'hr', 'administrative'].includes(response.user.role)) {
        navigate('/');
      } else if (response.user.role === 'user') {
        navigate('/');
      }
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  const logout = async () => {
    try {
      console.log('Current User:', user); // Log the current user before logging out
  
   
      // Clear user state and local storage
      setUser(null);
      localStorage.removeItem('user');
  
      // Confirm user state is null after logout
      console.log('User after logout:', user);
  
      // Redirect to signin page
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };
  


  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
