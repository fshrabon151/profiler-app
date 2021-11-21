import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Spinner from '../layouts/Spinner';


const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  return loading ? (
    <Spinner/>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
