import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createOrder } from '../api/orderApi';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotalPrice(total);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login to place an order.');
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    const orderData = {
      orderItems: cartItems.map(item => ({
        item: item._id,
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      totalPrice: totalPrice,
    };

    try {
      const createdOrder = await createOrder(orderData);
      toast.success('Order placed successfully!');
      localStorage.removeItem('cart');
      navigate(`/order/${createdOrder._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order.');
    }
  };
  
    const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
    toast.success('Item removed from cart');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-4 pb-4 border-b">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  {item.qty} x ₹{item.price.toFixed(2)}
                </p>
              </div>
              <div className='flex items-center gap-4'>
                 <p className="text-lg font-bold">₹{(item.qty * item.price).toFixed(2)}</p>
                 <button onClick={() => removeFromCart(item._id)} className='text-red-500 hover:text-red-700'>
                    Remove
                 </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-bold">Total: ₹{totalPrice.toFixed(2)}</h2>
            <button onClick={handlePlaceOrder} className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;