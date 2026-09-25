import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/User';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  loginState: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data);
          setToken(storedToken);
        } catch (error) {
          console.error("Token invalid", error);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const loginState = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
