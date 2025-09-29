// src/pages/OrderPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/api';
import CountdownTimer from '../components/CountdownTimer';

const OrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(orderId);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!order) return <p>Order not found.</p>;

  // Calculate the 15-minute expiry timestamp from createdAt
  const expiryTimestamp = new Date(new Date(order.createdAt).getTime() + 15 * 60 * 1000);

  return (
    <div>
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
      <h3>Items:</h3>
      <ul>
        {order.items.map(item => (
          <li key={item.menuItem._id}>
            {item.menuItem.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      {order.status === 'pending' && <CountdownTimer expiryTimestamp={expiryTimestamp} />}
    </div>
  );
};

export default OrderPage;