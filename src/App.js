import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Components/layouts/Header';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Home from './Components/Home';
import UpdateProfile from './Components/UpdateProfile';
import UpdatePassword from './Components/auth/UpdatePassword';

import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import ProtectedRoute from './Components/routes/ProtectedRoute';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default App;
