// src/pages/MenuPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMenuItems, createOrder } from '../services/api';
import MenuItem from '../components/MenuItem';

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await getMenuItems();
        setMenu(response.data);
      } catch (err) {
        setError('Failed to load menu items.');
      }
    };
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    // Basic cart logic: adds item ID and quantity
    setCart(prevCart => [...prevCart, { itemId: item._id, quantity: 1 }]);
    alert(`${item.name} added to cart!`);
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    try {
      const response = await createOrder(cart);
      const newOrder = response.data;
      // Redirect to the new order's page
      navigate(`/order/${newOrder._id}`);
    } catch (err) {
      setError('Failed to place order. An item may be out of stock.');
    }
  };

  return (
    <div>
      <h1>Canteen Menu</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {menu.map(item => (
          <MenuItem key={item._id} item={item} addToCart={addToCart} />
        ))}
      </div>
      <hr />
      <h2>Cart</h2>
      <p>Items in cart: {cart.length}</p>
      <button onClick={handlePlaceOrder} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Place Order
      </button>
    </div>
  );
};

export default MenuPage;