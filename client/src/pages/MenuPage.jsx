import React, { useState, useEffect } from 'react';
import { getItems } from '../api/itemApi';
import MenuItem from '../components/MenuItem';
import toast from 'react-hot-toast';

const MenuPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        toast.error('Could not fetch menu items.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();

    // Listen for custom event to refresh menu
    const handleMenuRefresh = () => {
      setLoading(true);
      fetchItems();
    };
    window.addEventListener('menu-refresh', handleMenuRefresh);
    return () => {
      window.removeEventListener('menu-refresh', handleMenuRefresh);
    };
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      if (existingItem.qty < item.stockCount) {
        existingItem.qty += 1;
        toast.success(`${item.name} quantity updated in cart`);
      } else {
        toast.error(`No more stock for ${item.name}`);
        return;
      }
    } else {
      cart.push({ ...item, qty: 1 });
      toast.success(`${item.name} added to cart`);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };


  if (loading) return <p>Loading menu...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <MenuItem key={item._id} item={item} addToCart={addToCart}/>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;