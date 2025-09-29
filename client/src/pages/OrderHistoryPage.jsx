import React, { useState, useEffect } from 'react';
import CountdownTimer from '../components/CountdowmTimer';
import { CANCEL_MINUTES } from '../constants';
import { getOrderHistory, cancelOrder } from '../api/orderApi';
import toast from 'react-hot-toast';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getOrderHistory();
        setOrders(data);
      } catch (error) {
        toast.error('Could not fetch order history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);
  
  const getStatusColor = (status) => {
    switch (status) {
        case 'COMPLETED': return 'text-green-600';
        case 'PENDING': return 'text-yellow-600';
        case 'CANCELLED': return 'text-red-600';
        default: return 'text-gray-600';
    }
  }

  if (loading) return <p>Loading history...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Your Order History</h1>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => {
            // Cancellation happens CANCEL_MINUTES after order creation
            const expiryTimestamp = new Date(order.createdAt).getTime() + CANCEL_MINUTES * 60 * 1000;
            const handleExpire = async () => {
              // Call backend to cancel order and restore stock
              try {
                await cancelOrder(order._id);
                setOrders((prevOrders) => {
                  const updated = [...prevOrders];
                  if (updated[idx].status === 'PENDING') {
                    updated[idx] = { ...updated[idx], status: 'CANCELLED' };
                    window.dispatchEvent(new Event('menu-refresh'));
                  }
                  return updated;
                });
              } catch (err) {
                toast.error('Failed to cancel order and restore items.');
              }
            };
            return (
              <div key={order._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600">Order ID: {order._id}</p>
                  <p className={`font-bold ${getStatusColor(order.status)}`}>{order.status}</p>
                </div>
                <p className="text-gray-500 mb-4">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                {/* Show countdown only if order is pending */}
                {order.status === 'PENDING' && (
                  <div className="mb-2">
                    <span className="text-sm text-red-500">Time left before cancellation: </span>
                    <CountdownTimer expiryTimestamp={expiryTimestamp} onExpire={handleExpire} />
                  </div>
                )}
                <div>
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex justify-between py-1">
                      <span>{item.name} (x{item.qty})</span>
                      <span>₹{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="text-right font-bold mt-2 pt-2 border-t">
                  Total: ₹{order.totalPrice.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;