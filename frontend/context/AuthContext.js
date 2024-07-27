import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state, could be { role: 'admin' | 'user', ...otherData }

  // Example login function
  const login = (userData) => setUser(userData);


  // Example logout function
  const logout = () => setUser(null);

  // Optionally, you could use useEffect to fetch user data from an API
  useEffect(() => {
    // Fetch user data from API or local storage
    // setUser(fetchedUserData);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
