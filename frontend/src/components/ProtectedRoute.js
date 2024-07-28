import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/signin" />;
  }

  return element;
};

export default ProtectedRoute;
