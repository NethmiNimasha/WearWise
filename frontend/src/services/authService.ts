import api from './api';
import { AuthResponse } from '../types/User';

export const login = async (data: any): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const register = async (data: any): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
