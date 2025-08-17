import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  // Check if user is logged in, if yes, allow access, otherwise redirect to login
  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
