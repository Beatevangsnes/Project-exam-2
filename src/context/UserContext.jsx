// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../utils/localStorage';
import { loginUser } from '../api/login';
import { apiRequest } from '../constants/apiService';
import { CREATE_API_KEY_URL } from '../constants/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = loadFromLocalStorage('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      setUser(userData.data);
      saveToLocalStorage('user', userData.data);
      saveToLocalStorage('accessToken', userData.data.accessToken);
      saveToLocalStorage('username', userData.data.name);

      const apiKeyData = await apiRequest(CREATE_API_KEY_URL, "POST", { name: "User profile key" });
      saveToLocalStorage('apiKey', apiKeyData.data.key);

      return userData; 
    } catch (error) {
      console.error("Error during login or creating API key:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    removeFromLocalStorage('user');
    removeFromLocalStorage('accessToken');
    removeFromLocalStorage('username');
    removeFromLocalStorage('apiKey');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
