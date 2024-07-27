import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, roles }) => {
  const { user } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/signin" />;
  }

  // Redirect based on role if role-based protection is provided
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/signup" />;
  }

  // Render the component if authenticated and authorized
  return element;
};

export default ProtectedRoute;
