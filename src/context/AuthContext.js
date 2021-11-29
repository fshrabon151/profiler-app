import axios from 'axios';
import { useContext, useState, useEffect, createContext } from 'react';
import setAuthToken from '../utils/setAuthToken';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    loading: true,
    isAuthenticated: false,
    error: null,
    isUpdated: false,
  });
  // Register user
  const register = async (userData) => {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await axios.post(`/api/v1/register`, userData, config);
      //   Success
      localStorage.setItem('token', data.token);
      setAuth({
        ...auth,
        loading: false,
        isAuthenticated: true,
        user: data.user,
      });
    } catch (error) {
      setAuth({
        ...auth,
        error: error.response.data.message,
      });
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const { data } = await axios.post(
        `/api/v1/login`,
        {
          email,
          password,
        },
        config
      );
      //   Success
      localStorage.setItem('token', data.token);

      setAuth({
        ...auth,
        loading: false,
        isAuthenticated: true,
        user: data.user,
      });
    } catch (error) {
      setAuth({
        ...auth,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: error.response.data.message,
      });
    }
  };

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.get(`/api/v1/me`);

      setAuth({
        ...auth,
        loading: false,
        isAuthenticated: true,
        user: data.user,
      });
    } catch (error) {
      localStorage.removeItem('token');
      setAuth({
        loading: false,
        isAuthenticated: false,
        user: null,
        error: error.response.data.message,
      });
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await axios.put(`/api/v1/me/update`, userData, config);
      setAuth({ ...auth, loading: false, isUpdated: data });
      setAuth({ ...auth, loading: false, isUpdated: false });
    } catch (error) {
      setAuth({
        ...auth,
        error: error.response.data.message,
      });
    }
  };

  // Update password
  const updatePassword = async (passwords) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const { data } = await axios.put(
        `/api/v1/password/update`,
        passwords,
        config
      );
      setAuth({ ...auth, loading: false, isUpdated: data });
      setAuth({ ...auth, loading: false, isUpdated: false });
    } catch (error) {
      setAuth({
        ...auth,
        error: error.response.data.message,
      });
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.get(`/api/v1/logout`);

      localStorage.removeItem('token');
      setAuth({ ...auth, loading: false, isAuthenticated: false, user: null });
    } catch (error) {
      setAuth({
        ...auth,
        error: error.response.data.message,
      });
    }
  };

  // Clear errors
  const clearErrors = async () => {
    setAuth({ ...auth, error: null });
  };

  const value = {
    register,
    login,
    loadUser,
    updateProfile,
    updatePassword,
    logout,
    clearErrors,
    user: auth.user,
    loading: auth.loading,
    isAuthenticated: auth.isAuthenticated,
    error: auth.error,
    isUpdated: auth.isUpdated,
  };

  //monitoring state changes

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
