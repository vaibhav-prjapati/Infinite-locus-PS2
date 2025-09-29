// src/pages/OrderHistoryPage.js
import React, { useState, useEffect } from 'react';
import { getOrderHistory } from '../services/api';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getOrderHistory();
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p>Loading history...</p>;

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {orders.map(order => (
            <li key={order._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
              <p><strong>Order ID:</strong> <Link to={`/order/${order._id}`}>{order._id}</Link></p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;