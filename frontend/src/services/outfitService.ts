import api from './api';
import { Outfit } from '../types/Outfit';

export const getOutfits = async (): Promise<Outfit[]> => {
  const response = await api.get('/outfits');
  return response.data;
};

export const generateOutfit = async (request: { occasion: string; weather: string; style: string }): Promise<Outfit> => {
  const response = await api.post('/outfits/generate', request);
  return response.data;
};
