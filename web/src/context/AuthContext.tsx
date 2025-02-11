import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { AxiosResponse } from 'axios';
import { postingData } from '../services/utils';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  login: ({ email, password }: { email: string, password: string }) => void;
  register: ({ name, email, password }: { name: string, email: string, password: string }) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated  ] = useState(false);
  

  useEffect(() => {
    const tokens = localStorage.getItem('tokens');
    if (tokens) {
      setIsAuthenticated(true);
    }
  }, []);

  const logout = async() => {
    const response = await postingData('/api/auth/logout/', {}) as AxiosResponse;  
    if (response.status === 200) {
      toast.success('Logout successful');
      localStorage.removeItem('tokens');
      setIsAuthenticated(false);
      navigate('/');
    } else {
      toast.error('Logout failed');
    }
  };

  const login = async ({ email, password }: { email: string, password: string }) => {
    const response = await postingData('/api/auth/login/', { email, password }) as AxiosResponse;  
    if (response.status === 200) {
      setIsAuthenticated(true);
      toast.success('Login successful, you will be redirected to the dashboard');
      localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
      navigate('/account/agreements');
    } else {
      toast.error('Login failed');
    }
  };  

  const register = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    const response = await postingData('/api/auth/register/', { name, email, password }) as AxiosResponse;
    if (response.status === 201) {
      toast.success('Registration successful, email verification sent');
      navigate('/verification/email');
    } else {
      toast.error('Registration failed');
    }
  };



  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 