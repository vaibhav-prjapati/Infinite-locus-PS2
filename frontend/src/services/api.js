// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // <-- IMPORTANT: Change this to your backend URL

const api = axios.create({
  baseURL: API_URL,
});

// Menu APIs
export const getMenuItems = () => api.get('/menu');

// Order APIs
export const createOrder = (items) => api.post('/orders', { items });
export const getOrderById = (orderId) => api.get(`/orders/${orderId}`);
export const getOrderHistory = () => api.get('/orders/history');

export default api;