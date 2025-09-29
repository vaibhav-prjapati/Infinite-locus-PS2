// src/components/MenuItem.js
import React from 'react';

const MenuItem = ({ item, addToCart }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' }}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
      <p><strong>Stock:</strong> {item.stockCount}</p>
      <button 
        onClick={() => addToCart(item)} 
        disabled={item.stockCount === 0}
      >
        {item.stockCount > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default MenuItem;