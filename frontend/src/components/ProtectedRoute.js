import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can render a loading spinner or some other placeholder here
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/notaccessible" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
