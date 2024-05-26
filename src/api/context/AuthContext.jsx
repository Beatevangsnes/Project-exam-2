// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import useFetchProfile from '../hooks/useFetchProfile';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const { profileData, isLoading, error } = useFetchProfile(user?.name);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', user.accessToken);
      localStorage.setItem('name', user.name);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('name');
    }
  }, [user]);

  useEffect(() => {
    if (profileData) {
      setUser((prevUser) => ({ ...prevUser, profile: profileData }));
    }
  }, [profileData]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
