import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/items`;

export const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};