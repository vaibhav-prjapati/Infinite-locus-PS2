import React from 'react';
import CountdownTimer from '../components/CountdowmTimer';

const OrderStatusPage = () => {
  // In a real app, you would fetch the order details by ID from the URL
  // For this example, we'll just show a generic message.
  
  const expiryTime = new Date();
  expiryTime.setSeconds(expiryTime.getSeconds() + 900); // 15 minutes from now

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-700 mb-6">
        Your order is now pending. Please complete payment or pickup within 15 minutes.
        The order will be automatically cancelled if not completed in time.
      </p>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">Time Remaining:</h2>
        <CountdownTimer expiryTimestamp={expiryTime} />
      </div>
    </div>
  );
};

export default OrderStatusPage;