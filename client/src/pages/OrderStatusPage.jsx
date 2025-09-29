import React from 'react';
import CountdownTimer from '../components/CountdowmTimer';
import { CANCEL_MINUTES } from '../constants';

const OrderStatusPage = () => {
  // In a real app, you would fetch the order details by ID from the URL
  // For this example, we'll just show a generic message.
  
  const expiryTimestamp = Date.now() + CANCEL_MINUTES * 60 * 1000;
  const [expired, setExpired] = React.useState(false);
  const handleExpire = () => setExpired(true);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-700 mb-6">
        Your order is now pending. Please complete payment or pickup within {CANCEL_MINUTES} minutes.
        The order will be automatically cancelled if not completed in time.
      </p>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">Time Remaining:</h2>
        <CountdownTimer expiryTimestamp={expiryTimestamp} onExpire={handleExpire} />
        {expired && (
          <p className="text-red-600 font-bold mt-4">Order has been automatically cancelled.</p>
        )}
      </div>
    </div>
  );
};

export default OrderStatusPage;