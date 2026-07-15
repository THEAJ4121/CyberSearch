import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('cyber_user', null);
  const [token, setToken] = useLocalStorage('cyber_token', null);
  const [authLoading, setAuthLoading] = useState(true);

  // Validate the JWT token with the backend on page load / mount
  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (err) {
        console.error('🔥 SESSION AUTH DECAY:', err.message);
        // Clear corrupt or expired session keys
        setUser(null);
        setToken(null);
      } finally {
        setAuthLoading(false);
      }
    };

    verifySession();
  }, [token, setUser, setToken]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const register = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, authLoading, login, logout, register, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
}
