import api from './api';
import { Clothing } from '../types/Clothing';

export const getWardrobe = async (): Promise<Clothing[]> => {
  const response = await api.get('/clothing');
  return response.data;
};

export const addClothing = async (clothing: Omit<Clothing, 'id'>): Promise<Clothing> => {
  const response = await api.post('/clothing', clothing);
  return response.data;
};

export const deleteClothing = async (id: number): Promise<void> => {
  await api.delete(`/clothing/${id}`);
};
