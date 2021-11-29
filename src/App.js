import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Components/layouts/Header';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Home from './Components/Home';
import UpdateProfile from './Components/UpdateProfile';
import UpdatePassword from './Components/auth/UpdatePassword';

import ProtectedRoute from './Components/routes/ProtectedRoute';
import setAuthToken from './utils/setAuthToken';
import GlobalProvider from './context/GlobalProvider';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <GlobalProvider>
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password-update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </GlobalProvider>
  );
};

export default App;
