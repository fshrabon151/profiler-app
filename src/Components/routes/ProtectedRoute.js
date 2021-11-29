import React from 'react';

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../layouts/Spinner';

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();
  return loading ? (
    <Spinner />
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
