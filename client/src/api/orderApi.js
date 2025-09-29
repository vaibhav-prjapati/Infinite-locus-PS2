// Function to cancel an order
export const cancelOrder = async (orderId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };
    const response = await axios.post(`${API_URL}/${orderId}/cancel`, {}, config);
    return response.data;
};
import axios from 'axios';

const API_URL = '/api/orders';

// Function to create an order
export const createOrder = async (orderData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };
    const response = await axios.post(API_URL, orderData, config);
    return response.data;
};

// Function to get order history
export const getOrderHistory = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };
    const response = await axios.get(`${API_URL}/history`, config);
    return response.data;
};